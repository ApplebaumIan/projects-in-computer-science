#!/usr/bin/env node
/*
Tiny script to parse an issue body in the simple issue template format and emit a JSON file
usage: node scripts/issue-to-project.js --input-file issue.txt --outdir documentation/src/data/projects --dry-run

This script is intentionally dependency-free.
*/

const fs = require('fs');
const path = require('path');

function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseIssueBody(body) {
  // Fields we expect (label followed by colon)
  const fields = {
    'Project Name': 'title',
    'Description': 'description',
    'Contact (email)': 'contact',
    'Tags (comma-separated)': 'tags',
    'Semester (optional)': 'semester',
    'Website (optional)': 'website',
    'Documentation (optional)': 'documentation',
    'Source (optional)': 'source',
    'Demo (optional)': 'demo'
  };

  const lines = body.split(/\r?\n/);
  let currKey = null;
  const result = {};

  for (let raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    // try match a field header
    const m = line.match(/^([A-Za-z0-9 ()-]+):\s*(.*)$/);
    if (m) {
      const header = m[1].trim();
      const rest = m[2] || '';
      if (fields[header]) {
        currKey = fields[header];
        if (currKey === 'tags') {
          result[currKey] = rest ? rest.split(',').map(t=>t.trim()).filter(Boolean) : [];
        } else {
          result[currKey] = rest;
        }
        continue;
      }
    }
    // if line doesn't match header, append to last field (for multi-line description)
    if (currKey) {
      result[currKey] = (result[currKey] ? result[currKey] + '\n' : '') + line;
    }
  }

  // post-process tags
  if (!result.tags) result.tags = [];

  // required: title, description
  return result;
}

function usage() {
  console.log('Usage: node scripts/issue-to-project.js --input-file issue.txt --outdir documentation/src/data/projects [--dry-run]');
}

function regenerateIndex(outDir) {
  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.json') && f !== '_index.json');
  const projects = [];
  files.forEach(f => {
    try {
      const obj = JSON.parse(fs.readFileSync(path.join(outDir, f), 'utf8'));
      projects.push(obj);
    } catch (e) {
      // skip invalid
    }
  });
  // sort by title
  projects.sort((a,b) => (a.title||'').localeCompare(b.title||''));
  const indexPath = path.join(outDir, '_index.json');
  fs.writeFileSync(indexPath, JSON.stringify(projects, null, 2) + '\n', 'utf8');
  return indexPath;
}

async function main() {
  const argv = process.argv.slice(2);
  const inFileIndex = argv.indexOf('--input-file');
  const outDirIndex = argv.indexOf('--outdir');
  const dryRun = argv.includes('--dry-run');

  if (inFileIndex === -1 || outDirIndex === -1) {
    usage();
    process.exit(2);
  }

  const inFile = argv[inFileIndex + 1];
  const outDir = argv[outDirIndex + 1];

  if (!fs.existsSync(inFile)) {
    console.error('Input file not found:', inFile);
    process.exit(3);
  }

  const body = fs.readFileSync(inFile, 'utf8');
  const data = parseIssueBody(body);

  if (!data.title || !data.description) {
    console.error('Validation failed: title and description are required.');
    console.error('Parsed data:', data);
    process.exit(4);
  }

  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  let i = 1;

  // ensure outDir exists
  if (!fs.existsSync(outDir) && !dryRun) fs.mkdirSync(outDir, { recursive: true });

  while (!dryRun && fs.existsSync(path.join(outDir, slug + '.json'))) {
    slug = `${baseSlug}-${i++}`;
  }

  const obj = {
    title: data.title,
    slug: slug,
    description: data.description,
    contact: data.contact || null,
    tags: data.tags || [],
    semester: data.semester || null,
    website: data.website || null,
    documentation: data.documentation || null,
    source: data.source || null,
    demo: data.demo || null,
    archived: false
  };

  const outPath = path.join(outDir, slug + '.json');

  if (dryRun) {
    console.log('DRY RUN - would write to:', outPath);
    console.log(JSON.stringify(obj, null, 2));

    // show what index would look like
    try {
      if (fs.existsSync(outDir)) {
        const files = fs.readdirSync(outDir).filter(f => f.endsWith('.json') && f !== '_index.json');
        const projects = files.map(f => {
          try { return JSON.parse(fs.readFileSync(path.join(outDir, f), 'utf8')); } catch(e) { return null; }
        }).filter(Boolean);
        projects.push(obj);
        projects.sort((a,b)=> (a.title||'').localeCompare(b.title||''));
        console.log('\nDRY RUN - index would be:');
        console.log(JSON.stringify(projects, null, 2));
      }
    } catch (e) {}

    return;
  }

  fs.writeFileSync(outPath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('Wrote', outPath);

  // regenerate index
  try {
    const indexPath = regenerateIndex(outDir);
    console.log('Regenerated index at', indexPath);
  } catch (e) {
    console.error('Failed to regenerate index:', e);
  }
}

if (require.main === module) main().catch(err=>{console.error(err); process.exit(1);});
