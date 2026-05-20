#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const {JSDOM} = require('jsdom');

const PROJECTS_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'showcaseProjects.js',
);
const OUTPUT_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'showcaseSystemOverviews.json',
);

const args = process.argv.slice(2);
const REFRESH_ALL =
  args.includes('--refresh-all') || process.env.REFRESH_OVERVIEWS === '1';
const PRUNE = args.includes('--prune');

function loadProjects() {
  return require(PROJECTS_FILE);
}

function loadExistingMapping() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function buildSystemOverviewCandidates(documentationUrl) {
  if (!documentationUrl) {
    return [];
  }

  try {
    const parsed = new URL(documentationUrl);
    const basePath = parsed.pathname.endsWith('/')
      ? parsed.pathname
      : `${parsed.pathname}/`;
    const docsRoot = basePath.includes('/docs/')
      ? `${basePath.split('/docs/')[0]}/docs/`
      : `${basePath}docs/`;
    const base = `${parsed.origin}${docsRoot.replace(/\/+/g, '/')}`;

    return [
      `${base}requirements/system-overview`,
      `${base}requirements/system-overview/`,
    ];
  } catch {
    return [];
  }
}

async function fetchHtml(url) {
  const response = await axios.get(url, {
    headers: {'User-Agent': 'showcase-overview-fetcher/1.0'},
    timeout: 15000,
  });

  return response.data;
}

function normalizeParagraph(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function absolutizeHref(href, baseUrl) {
  if (!href) {
    return '';
  }

  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return href;
  }
}

function sanitizeInlineHtml(node, baseUrl) {
  return Array.from(node.childNodes)
    .map((child) => {
      if (child.nodeType === 3) {
        return escapeHtml(child.textContent);
      }

      if (child.nodeType !== 1) {
        return '';
      }

      const tagName = child.tagName.toLowerCase();
      if (tagName === 'br') {
        return '<br>';
      }

      if (['strong', 'b', 'em', 'i', 'code'].includes(tagName)) {
        return `<${tagName}>${sanitizeInlineHtml(child, baseUrl)}</${tagName}>`;
      }

      if (tagName === 'a') {
        const href = absolutizeHref(child.getAttribute('href'), baseUrl);
        if (!href) {
          return sanitizeInlineHtml(child, baseUrl);
        }

        return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${sanitizeInlineHtml(
          child,
          baseUrl,
        )}</a>`;
      }

      return sanitizeInlineHtml(child, baseUrl);
    })
    .join('');
}

function renderList(listNode, baseUrl) {
  const tagName = listNode.tagName.toLowerCase();
  const items = Array.from(listNode.children)
    .filter((child) => child.tagName?.toLowerCase() === 'li')
    .map((item) => `<li>${sanitizeInlineHtml(item, baseUrl)}</li>`)
    .join('');

  return items ? `<${tagName}>${items}</${tagName}>` : '';
}

function renderBlockquote(blockquoteNode, baseUrl) {
  const parts = Array.from(blockquoteNode.children)
    .map((child) => renderOverviewBlock(child, baseUrl))
    .filter(Boolean)
    .join('');

  return parts ? `<blockquote>${parts}</blockquote>` : '';
}

function renderOverviewBlock(node, baseUrl) {
  if (!node || node.nodeType !== 1) {
    return '';
  }

  const tagName = node.tagName.toLowerCase();
  if (tagName === 'header') {
    return '';
  }

  if (['h2', 'h3', 'h4', 'p'].includes(tagName)) {
    const innerHtml = sanitizeInlineHtml(node, baseUrl);
    return innerHtml ? `<${tagName}>${innerHtml}</${tagName}>` : '';
  }

  if (tagName === 'ul' || tagName === 'ol') {
    return renderList(node, baseUrl);
  }

  if (tagName === 'blockquote') {
    return renderBlockquote(node, baseUrl);
  }

  return '';
}

function extractOverviewData(html, baseUrl) {
  const dom = new JSDOM(html);
  const contentRoot = dom.window.document.querySelector('.theme-doc-markdown.markdown');
  if (!contentRoot) {
    return {contentHtml: '', summary: ''};
  }

  contentRoot.querySelectorAll('a.hash-link').forEach((node) => node.remove());

  const contentHtml = Array.from(contentRoot.children)
    .map((node) => renderOverviewBlock(node, baseUrl))
    .filter(Boolean)
    .join('\n');

  const paragraphs = Array.from(contentRoot.querySelectorAll('p'))
    .map((node) => normalizeParagraph(node.textContent))
    .filter((text) => text.length > 40)
    .filter((text) => !text.endsWith(':'));

  const selected = [];
  for (const paragraph of paragraphs) {
    if (selected.includes(paragraph)) {
      continue;
    }
    selected.push(paragraph);
    if (selected.length >= 3) {
      break;
    }
  }

  return {
    contentHtml,
    summary: selected.join('\n\n'),
  };
}

async function fetchProjectOverview(project) {
  const candidates = buildSystemOverviewCandidates(project.documentation);
  for (const url of candidates) {
    try {
      const html = await fetchHtml(url);
      const overview = extractOverviewData(html, url);
      if (overview.summary) {
        return {url, ...overview};
      }
    } catch (error) {
      console.warn(`[overviews] Failed ${project.slug} @ ${url}: ${error.message}`);
    }
  }

  return null;
}

async function main() {
  const projects = loadProjects().filter((project) => project.documentation);
  const mapping = loadExistingMapping();
  const slugs = new Set(projects.map((project) => project.slug));

  let fetched = 0;
  let skipped = 0;
  let updated = 0;

  console.log(
    `[overviews] Found ${projects.length} showcase projects with documentation. RefreshAll=${
      REFRESH_ALL ? 'yes' : 'no'
    } Prune=${PRUNE ? 'yes' : 'no'}`,
  );

  for (const project of projects) {
    if (
      !REFRESH_ALL &&
      mapping[project.slug]?.summary &&
      mapping[project.slug]?.contentHtml
    ) {
      skipped += 1;
      continue;
    }

    const result = await fetchProjectOverview(project);
    if (!result) {
      continue;
    }

    if (mapping[project.slug]) {
      updated += 1;
    } else {
      fetched += 1;
    }

    mapping[project.slug] = result;
    console.log(`[overviews] ${project.slug} -> ${result.url}`);
  }

  if (PRUNE) {
    Object.keys(mapping).forEach((slug) => {
      if (!slugs.has(slug)) {
        delete mapping[slug];
      }
    });
  }

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(mapping, null, 2)}\n`);
  console.log(
    `[overviews] Summary: fetched=${fetched} updated=${updated} skipped=${skipped} totalStored=${Object.keys(mapping).length}`,
  );
  console.log(`[overviews] Wrote mapping to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error('[overviews] Unexpected error', error);
  process.exit(1);
});
