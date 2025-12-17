#!/usr/bin/env node
/**
 * Crawl project documentation pages and infer category tags (non-language tags)
 * based on keyword matches. Save results to src/data/showcaseCategoryHints.json
 * as a mapping { slug: string: string[] }.
 *
 * Usage:
 *  node scripts/fetch-showcase-categories.js [--refresh-all] [--prune] [--max-pages=N]
 *
 * Notes:
 *  - Only detects tags present in TagList but not in LanguageTagList
 *  - Skips projects without a documentation URL
 */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const SHOWCASE_FILE = path.join(__dirname, '..', 'src', 'data', 'showcase.ts');
const DEMO_LINEUP_FILE = path.join(__dirname, '..', 'src', 'data', 'demoLineup.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'showcaseCategoryHints.json');

const args = process.argv.slice(2);
const REFRESH_ALL = args.includes('--refresh-all') || process.env.REFRESH_CATEGORIES === '1';
const PRUNE = args.includes('--prune');
const maxPagesArg = args.find((a) => a.startsWith('--max-pages='));
const MAX_PAGES = maxPagesArg ? parseInt(maxPagesArg.split('=')[1], 10) || 3 : 3;
const explainArg = args.find((a) => a.startsWith('--explain='));
const EXPLAIN_SLUG = explainArg ? explainArg.split('=')[1] : null;

// Tags we never auto-assign (you prefer to manage these manually)
const EXCLUDED_AUTOTAGS = new Set(['github', 'jira']);
// Per-slug exclusions: tags that should be removed even if keyword detection matches
const PER_SLUG_EXCLUDED_TAGS = {
  'piglet-prep': ['embedded'],
  'hip-io': ['collision', 'unity','game engine', 'safety'],
  'collabybot': ['robotics'],
  'whiteboard-assistant':['game','accessibility'],
  'ar-pet-pals': ['game'],
  'blastpad': ['game'],
  'lomo': ['game'],
};

function readFileIfExists(p) {
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

function extractTagList(text) {
  const m = text.match(/export const TagList:[\s\S]*?=\s*\[([\s\S]*?)];/m);
  if (!m) return [];
  const inner = m[1];
  const tags = [];
  const re = /'([^']+)'/g;
  let r;
  while ((r = re.exec(inner))) tags.push(r[1]);
  return tags;
}

function extractLanguageTagList(text) {
  const m = text.match(/export const LanguageTagList:[\s\S]*?=\s*\[([\s\S]*?)];/m);
  if (!m) return [];
  const inner = m[1];
  const tags = [];
  const re = /'([^']+)'/g;
  let r;
  while ((r = re.exec(inner))) tags.push(r[1]);
  return tags;
}

// Generalized parser for any exported projects array: export const <exportName>...
function parseProjects(fileContent, exportName = 'projects') {
  if (!fileContent) return [];
  const startIdx = fileContent.indexOf(`export const ${exportName}`);
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
      const slugMatch = block.match(/slug:\s*'([^']+)'/);
      const docMatch = block.match(/documentation:\s*'([^']+)'/);
      const titleMatch = block.match(/title:\s*'([^']+)'/);
      if (slugMatch) {
        projects.push({ slug: slugMatch[1], documentation: docMatch ? docMatch[1] : null, title: titleMatch ? titleMatch[1] : '(untitled)' });
      }
    }
  }
  return projects;
}

function loadExistingMapping() {
  if (!fs.existsSync(OUTPUT_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  } catch {
    return {};
  }
}

// Build keyword map for each non-language tag
function buildKeywordMap(allTags, languageTags) {
  const nonLang = allTags.filter((t) => !languageTags.includes(t) && !EXCLUDED_AUTOTAGS.has(t));
  /** @type {Record<string,string[]>} */
  const map = {};
  const add = (tag, arr) => { map[tag] = Array.from(new Set(arr.map((s) => s.toLowerCase()))); };

  for (const tag of nonLang) map[tag] = [];
  // Curated keywords (word-boundary matching will be applied)
  add('ai', ['artificial intelligence', 'ai']);
  add('llms', ['llm', 'gpt', 'llama', 'mistral', 'claude']);
  add('ml', ['machine learning', 'model training', 'classification', 'regression', 'neural network', 'inference']);
  // Refine CV to avoid generic terms like "recognition" alone
  add('computer-vision', [
    'computer vision',
    'opencv',
    'object detection',
    'image classification',
    'image segmentation',
    'semantic segmentation',
    'pose estimation',
  ]);
  // Avoid the short token "ar" to reduce false positives; use specific terms only
  add('ar', ['augmented reality', 'arkit', 'arcore']);
  add('unity', ['unity', 'game engine']);
  add('webgl', ['webgl', 'three.js', 'babylon.js']);
  add('pwa', ['progressive web app', 'pwa', 'service worker', 'offline']);
  add('web', ['web app', 'web application', 'single page application', 'spa']);
  add('mobile', ['mobile app', 'android', 'ios', 'react native', 'flutter']);
  add('discordBot', ['discord bot', 'discord.js', 'discord.py']);
  // intentionally omit 'github' and 'jira' from auto-tagging
  add('gamification', ['gamification', 'points', 'badges', 'leaderboard']);
  add('game', ['game', 'multiplayer', 'levels', 'boss', 'gameplay']);
  add('gaming', ['gaming']);
  add('vscode-extension', ['vscode extension', 'visual studio code extension']);
  add('canvas-lms', ['canvas lms', 'instructure']);
  add('research', ['research study', 'user study', 'irb']);
  add('education', ['education', 'students', 'classroom', 'curriculum']);
  add('accessibility', ['accessibility', 'a11y', 'screen reader']);
  add('aac', ['augmentative and alternative communication', 'aac']);
  add('health', ['health', 'wellness']);
  add('fitness', ['fitness', 'workout', 'exercise']);
  add('safety', ['safety', 'collision', 'emergency']);
  add('sensors', ['sensor', 'accelerometer', 'gyroscope', 'temperature', 'humidity']);
  add('iot', ['iot', 'internet of things', 'esp32', 'esp8266', 'arduino', 'pico','rp2040']);
  add('bluetooth', ['bluetooth', 'ble']);
  add('raspberry-pi', ['raspberry pi', 'raspberry-pi', 'raspi']);
  add('embedded', ['firmware', 'embedded']);
  add('robotics', ['robot', 'robotics', 'ros']);
  add('geolocation', ['geolocation', 'gps', 'map', 'maps', 'routing', 'geofence']);
  add('social', ['social network', 'social']);
  add('code-quality', ['code review', 'linting', 'static analysis', 'refactor']);
  add('devops', ['devops', 'ci/cd', 'pipeline']);
  add('api', ['api', 'rest api', 'graphql']);
  add('library', ['library', 'sdk']);
  add('speech-to-text', ['speech to text', 'asr', 'transcription', 'whisper']);
  add('laravel', ['laravel']);
  add('nextjs', ['next.js', 'nextjs']);
  add('react', ['react', 'react.js']);
  add('django', ['django']);
  add('flask', ['flask']);
  add('sqlite', ['sqlite']);
  add('postgresql', ['postgres', 'postgresql']);
  add('mongodb', ['mongodb', 'mongo']);
  add('tensorflow', ['tensorflow', 'tf.keras']);
  add('pytorch', ['pytorch', 'torch']);
  add('virtual-pet', ['virtual pet']);
  add('multiplayer', ['multiplayer']);

  return { map, nonLang };
}

async function fetchPage(url) {
  try {
    const res = await axios.get(url, { timeout: 15000, headers: { 'User-Agent': 'showcase-crawler/1.0' } });
    return res.data;
  } catch (e) {
    console.warn(`[categories] GET ${url} failed: ${e.message}`);
    return null;
  }
}

function collectLinks(baseUrl, html, limit) {
  try {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const a = Array.from(doc.querySelectorAll('a[href]'));
    const base = new URL(baseUrl);
    const links = [];
    for (const el of a) {
      const href = el.getAttribute('href');
      if (!href) continue;
      // Resolve relative
      let url;
      try { url = new URL(href, baseUrl); } catch { continue; }
      // Same origin
      if (url.origin !== base.origin) continue;
      // Keep within the same site path root (home/docs) to avoid crawling the world
      if (!url.pathname.startsWith('/')) continue;
      // Skip large binaries
      if (/[.](zip|pdf|png|jpg|jpeg|gif|webp|svg)$/i.test(url.pathname)) continue;
      links.push(url.href);
      if (links.length >= limit) break;
    }
    return Array.from(new Set(links));
  } catch {
    return [];
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function makeWordBoundaryRegex(kw) {
  const esc = escapeRegex(kw.trim().toLowerCase());
  // Use non-alnum boundaries to avoid matching substrings like 'ar' in 'library'
  // Pattern: (^|[^a-z0-9])kw($|[^a-z0-9]) with 'i' handled by lowercasing text
  return new RegExp(`(^|[^a-z0-9])${esc}($|[^a-z0-9])`);
}

function textFromHtml(html) {
  try {
    const dom = new JSDOM(html);
    const text = dom.window.document.body.textContent || '';
    return text.toLowerCase();
  } catch {
    return '';
  }
}

function detectTags(text, keywordMap, allowedTags, explain = false) {
  const found = new Set();
  const reasons = {};
  for (const tag of allowedTags) {
    const kws = keywordMap[tag] || [];
    for (const kw of kws) {
      if (!kw) continue;
      const rx = makeWordBoundaryRegex(kw);
      if (rx.test(text)) {
        found.add(tag);
        if (explain) {
          (reasons[tag] ||= []).push(kw);
        }
        break;
      }
    }
  }
  return { tags: Array.from(found), reasons };
}

function applyPerSlugExclusions(slug, tags) {
  const exclude = PER_SLUG_EXCLUDED_TAGS[slug];
  if (!exclude || !Array.isArray(tags)) return tags;
  const filtered = tags.filter(t => !exclude.includes(t));
  return filtered;
}

async function main() {
  const showcaseContent = readFileIfExists(SHOWCASE_FILE);
  const demoLineupContent = readFileIfExists(DEMO_LINEUP_FILE);
  if (!showcaseContent) {
    console.log('[categories] showcase.ts not found; aborting');
    return;
  }
  const allTags = extractTagList(showcaseContent);
  const langTags = extractLanguageTagList(showcaseContent);
  const { map: keywordMap, nonLang } = buildKeywordMap(allTags, langTags);
  const allowed = nonLang; // already excludes language tags + excluded autotags
  const showcaseProjects = parseProjects(showcaseContent, 'projects');
  const demoProjects = parseProjects(demoLineupContent, 'demoLineupProjects');
  // Merge & de-duplicate by slug
  const merged = [];
  const seen = new Set();
  for (const p of [...showcaseProjects, ...demoProjects]) {
    if (!p.slug || seen.has(p.slug)) continue;
    merged.push(p); seen.add(p.slug);
  }
  if (!merged.length) {
    console.log('[categories] No projects parsed.');
    return;
  }
  console.log(`[categories] Found ${showcaseProjects.length} showcase projects + ${demoProjects.length} demo lineup projects => total=${merged.length}. RefreshAll=${REFRESH_ALL ? 'yes' : 'no'} Prune=${PRUNE ? 'yes' : 'no'} MaxPages=${MAX_PAGES}`);

  const mapping = loadExistingMapping();
  const presentSlugs = new Set(merged.map((p) => p.slug));

  let fetched = 0, updated = 0, skipped = 0;

  for (const p of merged) {
    const existing = mapping[p.slug];
    const needs = REFRESH_ALL || !existing || (Array.isArray(existing) && existing.length === 0);
    if (!needs) {
      // Still enforce per-slug exclusions on existing mapping
      if (existing) {
        const adjusted = applyPerSlugExclusions(p.slug, existing);
        if (adjusted.length !== existing.length) {
          mapping[p.slug] = adjusted;
          console.log(`[categories] adjusted (exclusions) ${p.slug} -> ${adjusted.join(', ')}`);
        }
      }
      skipped++;
      continue;
    }
    if (!p.documentation) { console.warn(`[categories] Skip slug=${p.slug} (no documentation URL)`); continue; }

    const seed = p.documentation;
    const first = await fetchPage(seed);
    if (!first) continue;
    const links = collectLinks(seed, first, MAX_PAGES - 1);
    const pages = [first];
    for (const href of links) {
      const h = await fetchPage(href);
      if (h) pages.push(h);
      if (pages.length >= MAX_PAGES) break;
    }
    const text = pages.map(textFromHtml).join('\n');
    const explaining = EXPLAIN_SLUG && EXPLAIN_SLUG === p.slug;
    const { tags, reasons } = detectTags(text, keywordMap, allowed, !!explaining);
    let finalTags = applyPerSlugExclusions(p.slug, tags);
    if (finalTags.length !== tags.length) {
      console.log(`[categories] exclusions applied for ${p.slug}: removed=${tags.filter(t=>!finalTags.includes(t)).join(', ')}`);
    }
    mapping[p.slug] = finalTags;
    if (explaining) {
      console.log(`[categories][explain] slug=${p.slug}`);
      for (const t of tags) {
        const why = (reasons[t] || []).join(', ');
        console.log(`  - ${t}: matched keywords => ${why}`);
      }
    }
    if (existing) updated++; else fetched++;
    console.log(`[categories] ${p.slug} -> ${finalTags.join(', ')}`);
  }

  if (PRUNE) {
    for (const slug of Object.keys(mapping)) {
      if (!presentSlugs.has(slug)) delete mapping[slug];
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2));
  console.log(`[categories] Summary: fetched=${fetched} updated=${updated} skipped=${skipped} totalStored=${Object.keys(mapping).length}`);
  console.log(`[categories] Wrote mapping to ${OUTPUT_FILE}`);
}

main().catch((e) => {
  console.error('[categories] Unexpected error', e);
  process.exit(1);
});
