#!/usr/bin/env node
/**
 * Fetch GitHub repository languages for showcase projects and output a JSON
 * mapping from project slug -> array of language tag identifiers (lowercase).
 *
 * Caching behavior:
 * - Reads existing showcaseLanguages.json if present.
 * - Only fetches languages for slugs not already in the mapping or whose entry is empty.
 * - Pass --refresh-all (or REFRESH_LANGS=1 env) to force refetch of all slugs.
 * - Pass --prune to remove mapping entries for slugs no longer present in projects.
 *
 * Uses the GitHub Languages API: GET /repos/:owner/:repo/languages
 * Respects GITHUB_TOKEN/GH_TOKEN if provided (to increase rate limits).
 */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const SHOWCASE_FILE = path.join(__dirname, '..', 'src', 'data', 'showcase.ts');
const DEMO_FILE = path.join(__dirname, '..', 'src', 'data', 'demoLineup.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'showcaseLanguages.json');

const args = process.argv.slice(2);
const REFRESH_ALL = args.includes('--refresh-all') || process.env.REFRESH_LANGS === '1';
const PRUNE = args.includes('--prune');

// Map GitHub language names -> tag identifiers defined in showcase.ts
const LANGUAGE_MAP = {
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'Python': 'python',
  'C#': 'csharp',
  'C++': 'cpp',
  'HTML': 'html',
  'CSS': 'css',
  'Shell': 'shell',
  'Swift': 'swift',
  'Go': 'go',
  'Kotlin': 'kotlin'
};
// Languages we want to ignore entirely (do not output as tags)
const IGNORE_GITHUB_LANGS = new Set(['HTML','CSS']);

function parseProjects(fileContent) {
  // Naive block parser for objects inside export const projects: Project[] = [ ... ];
  const startIdx = fileContent.indexOf('export const projects');
  if (startIdx === -1) return [];
  const arrayStart = fileContent.indexOf('[', startIdx);
  if (arrayStart === -1) return [];
  const arrayEnd = fileContent.indexOf('];', arrayStart);
  if (arrayEnd === -1) return [];
  const arrayContent = fileContent.slice(arrayStart + 1, arrayEnd);
  const lines = arrayContent.split(/\r?\n/);
  const projects = [];
  let buffer = [];
  let depth = 0;
  for (const line of lines) {
    if (line.includes('{')) depth++;
    if (depth > 0) buffer.push(line);
    if (line.includes('}')) depth--;
    if (depth === 0 && buffer.length) {
      const block = buffer.join('\n');
      buffer = [];
      const sourceMatch = block.match(/source:\s*'([^']+)'/);
      const slugMatch = block.match(/slug:\s*'([^']+)'/);
      if (slugMatch) {
        projects.push({ slug: slugMatch[1], source: sourceMatch ? sourceMatch[1] : null });
      }
    }
  }
  return projects;
}

function parseProjectsFromSource(fileContent) {
  const startIdx = fileContent.indexOf('export const projects');
  if (startIdx === -1) return [];
  const arrayStart = fileContent.indexOf('[', startIdx);
  if (arrayStart === -1) return [];
  const arrayEnd = fileContent.indexOf('];', arrayStart);
  if (arrayEnd === -1) return [];
  const arrayContent = fileContent.slice(arrayStart + 1, arrayEnd);
  const lines = arrayContent.split(/\r?\n/);
  const projects = [];
  let buffer = [];
  let depth = 0;
  for (const line of lines) {
    if (line.includes('{')) depth++;
    if (depth > 0) buffer.push(line);
    if (line.includes('}')) depth--;
    if (depth === 0 && buffer.length) {
      const block = buffer.join('\n');
      buffer = [];
      const sourceMatch = block.match(/source:\s*'([^']+)'/);
      const slugMatch = block.match(/slug:\s*'([^']+)'/);
      if (slugMatch) {
        projects.push({ slug: slugMatch[1], source: sourceMatch ? sourceMatch[1] : null });
      }
    }
  }
  return projects;
}

// reuse existing parseProjects for showcase; add new demo parser
function parseDemoLineup(fileContent) {
  const startIdx = fileContent.indexOf('export const demoLineupProjects');
  if (startIdx === -1) return [];
  const arrayStart = fileContent.indexOf('[', startIdx);
  if (arrayStart === -1) return [];
  const arrayEnd = fileContent.indexOf('];', arrayStart);
  if (arrayEnd === -1) return [];
  const arrayContent = fileContent.slice(arrayStart + 1, arrayEnd);
  const lines = arrayContent.split(/\r?\n/);
  const projects = [];
  let buffer = [];
  let depth = 0;
  for (const line of lines) {
    if (line.includes('{')) depth++;
    if (depth > 0) buffer.push(line);
    if (line.includes('}')) depth--;
    if (depth === 0 && buffer.length) {
      const block = buffer.join('\n');
      buffer = [];
      const sourceMatch = block.match(/source:\s*'([^']+)'/);
      const slugMatch = block.match(/slug:\s*'([^']+)'/);
      if (slugMatch) {
        projects.push({ slug: slugMatch[1], source: sourceMatch ? sourceMatch[1] : null });
      }
    }
  }
  return projects;
}

async function fetchLanguagesForRepo(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/languages`;
  const headers = token ? { Authorization: `token ${token}` } : {};
  try {
    const res = await axios.get(url, { headers, timeout: 15000 });
    return res.data || {};
  } catch (e) {
    console.warn(`[languages] Failed ${owner}/${repo}: ${e.message}`);
    return null;
  }
}

function extractRepoInfo(sourceUrl) {
  if (!sourceUrl) return null;
  // Expect https://github.com/owner/repo(...)
  const m = sourceUrl.match(/https:\/\/github.com\/(.+?)\/(.+?)(?:$|\/)/);
  if (!m) return null;
  return { owner: m[1], repo: m[2] };
}

function loadExistingMapping() {
  if (!fs.existsSync(OUTPUT_FILE)) return {};
  try {
    const raw = fs.readFileSync(OUTPUT_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.warn('[languages] Could not parse existing mapping, starting fresh.');
    return {};
  }
}

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
  const fileContent = fs.readFileSync(SHOWCASE_FILE, 'utf8');
  const projects = parseProjects(fileContent);
  const demoContent = fs.existsSync(DEMO_FILE) ? fs.readFileSync(DEMO_FILE,'utf8') : '';
  const demoProjects = parseDemoLineup(demoContent);
  const allProjects = [...projects, ...demoProjects];
  if (!allProjects.length) {
    console.warn('[languages] No projects parsed, aborting.');
    return;
  }
  console.log(`[languages] Found ${projects.length} showcase projects + ${demoProjects.length} demo lineup projects (total ${allProjects.length}). RefreshAll=${REFRESH_ALL ? 'yes' : 'no'} Prune=${PRUNE ? 'yes' : 'no'}`);

  const mapping = loadExistingMapping();

  let fetchedCount = 0;
  let skippedCount = 0;
  let updatedCount = 0;

  const presentSlugs = new Set(allProjects.map(p => p.slug));
  for (const p of allProjects) {
    const existing = mapping[p.slug];
    const needsFetch = REFRESH_ALL || !existing || (Array.isArray(existing) && existing.length === 0);
    if (!needsFetch) {
      skippedCount++;
      continue;
    }
    if (!p.source) {
      console.warn(`[languages] Skip slug=${p.slug} (no source repo)`);
      continue;
    }
    const info = extractRepoInfo(p.source);
    if (!info) {
      console.warn(`[languages] Could not parse repo from URL: ${p.source}`);
      continue;
    }
    const data = await fetchLanguagesForRepo(info.owner, info.repo, token);
    if (!data) continue;
    // Convert languages object {Lang: bytes} -> sorted array of mapped tag ids
    const langEntries = Object.entries(data)
      .map(([name, bytes]) => ({ name, bytes }))
      .filter(e => LANGUAGE_MAP[e.name] && !IGNORE_GITHUB_LANGS.has(e.name))
      .sort((a, b) => b.bytes - a.bytes);
    const tags = langEntries.map(e => LANGUAGE_MAP[e.name]);
    if (tags.length) {
      if (existing) updatedCount++; else fetchedCount++;
      mapping[p.slug] = tags;
      console.log(`[languages] ${p.slug} -> ${tags.join(', ')}`);
    } else {
      console.log(`[languages] ${p.slug} -> (no mapped languages)`);
      mapping[p.slug] = [];
    }
  }

  if (PRUNE) {
    for (const slug of Object.keys(mapping)) {
      if (!presentSlugs.has(slug)) {
        delete mapping[slug];
      }
    }
  }

  // Write JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2));
  console.log(`[languages] Summary: fetched=${fetchedCount} updated=${updatedCount} skipped=${skippedCount} totalStored=${Object.keys(mapping).length}`);
  console.log(`[languages] Wrote mapping to ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error('[languages] Unexpected error', err);
  process.exit(1);
});
