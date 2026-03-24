#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const pdfRoot = path.join(rootDir, 'static', 'slides');
const htmlRoot = path.join(rootDir, 'static', 'slides-html');
const manifestPath = path.join(pdfRoot, 'manifest.json');

function walk(dir, matcher, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, matcher, results);
      continue;
    }

    if (matcher(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function toPosixRelative(baseDir, absolutePath) {
  return path.relative(baseDir, absolutePath).split(path.sep).join('/');
}

function titleFromRelativePath(relativePdfPath) {
  const withoutExt = relativePdfPath.replace(/\.pdf$/i, '');
  return withoutExt
    .split('/')
    .map((part) => part.replace(/[-_]+/g, ' ').trim())
    .join(' / ');
}

function createManifest() {
  const pdfFiles = walk(pdfRoot, (filePath) => filePath.toLowerCase().endsWith('.pdf'));

  const slides = pdfFiles
    .map((pdfFile) => {
      const relPdfPath = toPosixRelative(pdfRoot, pdfFile);
      const relWithoutExt = relPdfPath.replace(/\.pdf$/i, '');
      const htmlIndexPath = path.join(htmlRoot, relWithoutExt, 'index.html');

      if (!fs.existsSync(htmlIndexPath)) {
        return null;
      }

      return {
        title: titleFromRelativePath(relPdfPath),
        pdf: `/slides/${relPdfPath}`,
        html: `/slides-html/${relWithoutExt}/`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));

  fs.mkdirSync(pdfRoot, {recursive: true});
  fs.writeFileSync(manifestPath, `${JSON.stringify(slides, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${slides.length} slide entries to ${manifestPath}`);
}

createManifest();

