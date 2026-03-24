#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const pdfRoot = path.join(rootDir, 'static', 'slides');
const htmlRoot = path.join(rootDir, 'static', 'slides-html');
const manifestPath = path.join(pdfRoot, 'manifest.json');
const slidesDocsRoot = path.join(rootDir, 'slides-docs');
const groupBy = process.env.SLIDES_GROUP_BY || 'week';
const groupBasePath = `${groupBy}s`;
const generatedGroupsRoot = path.join(slidesDocsRoot, groupBasePath);

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

function toDisplayLabel(value) {
  return value.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-{2,}/g, '-');
}

function escapeForMdx(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeForSingleQuotedJs(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function capitalize(value) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function parseGroup(folderName) {
  const numericMatch = folderName.match(new RegExp(`^${groupBy}[-_\\s]?(\\d+)$`, 'i'));
  if (numericMatch) {
    const groupOrder = Number(numericMatch[1]);
    return {
      groupId: `${groupBy}-${groupOrder}`,
      groupLabel: `${capitalize(groupBy)} ${groupOrder}`,
      groupOrder,
    };
  }

  const fallbackLabel = toDisplayLabel(folderName);
  const fallbackId = slugify(folderName) || 'uncategorized';
  return {
    groupId: fallbackId,
    groupLabel: fallbackLabel || 'Uncategorized',
    groupOrder: Number.MAX_SAFE_INTEGER,
  };
}

function sortGroups(a, b) {
  if (a.groupOrder !== b.groupOrder) {
    return a.groupOrder - b.groupOrder;
  }

  return a.groupLabel.localeCompare(b.groupLabel);
}

function sortSlides(a, b) {
  return a.title.localeCompare(b.title);
}

function buildSlideModel() {
  const pdfFiles = walk(pdfRoot, (filePath) => filePath.toLowerCase().endsWith('.pdf'));

  return pdfFiles
    .map((pdfFile) => {
      const relPdfPath = toPosixRelative(pdfRoot, pdfFile);
      const relWithoutExt = relPdfPath.replace(/\.pdf$/i, '');
      const htmlIndexPath = path.join(htmlRoot, relWithoutExt, 'index.html');

      if (!fs.existsSync(htmlIndexPath)) {
        return null;
      }

      const pathParts = relWithoutExt.split('/');
      const groupFolder = pathParts[0] || 'uncategorized';
      const slideBaseName = pathParts[pathParts.length - 1] || relWithoutExt;
      const groupInfo = parseGroup(groupFolder);
      const slideSlug = slugify(slideBaseName) || 'slide';
      const docPath = `/slides/${groupBasePath}/${groupInfo.groupId}/${slideSlug}`;

      return {
        groupId: groupInfo.groupId,
        groupLabel: groupInfo.groupLabel,
        groupOrder: groupInfo.groupOrder,
        title: toDisplayLabel(slideBaseName),
        slideSlug,
        pdf: `/slides/${relPdfPath}`,
        html: `/slides-html/${relWithoutExt}/`,
        docPath,
      };
    })
    .filter(Boolean);
}

function groupSlides(slides) {
  const groupMap = new Map();

  for (const slide of slides) {
    if (!groupMap.has(slide.groupId)) {
      groupMap.set(slide.groupId, {
        groupId: slide.groupId,
        groupLabel: slide.groupLabel,
        groupOrder: slide.groupOrder,
        items: [],
      });
    }

    groupMap.get(slide.groupId).items.push(slide);
  }

  return Array.from(groupMap.values())
    .sort(sortGroups)
    .map((group) => ({
      ...group,
      items: group.items.sort(sortSlides),
    }));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeOverviewDoc(groups) {
  const cardItems = groups
    .map((group) => {
      const itemCount = group.items.length;
      const itemLabel = itemCount === 1 ? 'slide' : 'slides';
      return `  {type: 'link', label: '${escapeForSingleQuotedJs(group.groupLabel)}', href: '/slides/${groupBasePath}/${group.groupId}', description: '${itemCount} ${itemLabel}', customProps: {icon: 'learn', affordanceText: 'Open ${escapeForSingleQuotedJs(group.groupLabel)}'}}`;
    })
    .join(',\n');

  const content = `---
id: intro
title: Lecture Slides
sidebar_position: 1
---

import DocCardList from '@theme/DocCardList';

export const groupCards = [
${cardItems}
];

Browse slides by ${groupBy}.

<DocCardList items={groupCards} />`;
  fs.writeFileSync(path.join(slidesDocsRoot, 'intro.mdx'), `${content}\n`, 'utf8');
}

function cleanGeneratedGroupRoots() {
  ['weeks', 'sprints', 'groups'].forEach((dirName) => {
    fs.rmSync(path.join(slidesDocsRoot, dirName), {recursive: true, force: true});
  });
}

function writeGroupedDocs(groups) {
  cleanGeneratedGroupRoots();
  fs.mkdirSync(generatedGroupsRoot, {recursive: true});

  writeJson(path.join(generatedGroupsRoot, '_category_.json'), {
    label: `${capitalize(groupBy)}s`,
    position: 2,
    collapsed: false,
    collapsible: true,
  });

  groups.forEach((group, groupIndex) => {
    const groupDir = path.join(generatedGroupsRoot, group.groupId);
    fs.mkdirSync(groupDir, {recursive: true});

    writeJson(path.join(groupDir, '_category_.json'), {
      label: group.groupLabel,
      position: groupIndex + 1,
      collapsed: false,
      collapsible: true,
    });

    const indexContent = `---\ntitle: \"${escapeForMdx(group.groupLabel)}\"\nsidebar_position: 1\n---\n\nimport SlidesCatalog from '@site/src/components/SlidesCatalog';\n\n<SlidesCatalog groupId=\"${escapeForMdx(group.groupId)}\" />\n`;
    fs.writeFileSync(path.join(groupDir, 'index.mdx'), indexContent, 'utf8');

    group.items.forEach((slide, slideIndex) => {
      const content = `---\ntitle: \"${escapeForMdx(slide.title)}\"\nsidebar_position: ${slideIndex + 1}\n---\n\nimport {SlideEmbed} from '@site/src/components/SlidesCatalog';\n\n<SlideEmbed\n  title=\"${escapeForMdx(slide.title)}\"\n  pdf=\"${escapeForMdx(slide.pdf)}\"\n  html=\"${escapeForMdx(slide.html)}\"\n/>\n`;
      fs.writeFileSync(path.join(groupDir, `${slide.slideSlug}.mdx`), content, 'utf8');
    });
  });

  writeOverviewDoc(groups);
}

function createManifest() {
  const slides = buildSlideModel().sort((a, b) => {
    const groupCompare = sortGroups(a, b);
    if (groupCompare !== 0) {
      return groupCompare;
    }

    return sortSlides(a, b);
  });

  const groups = groupSlides(slides);
  const manifest = {
    generatedAt: new Date().toISOString(),
    groupBy,
    groupBasePath,
    totalSlides: slides.length,
    groups,
  };

  writeJson(manifestPath, manifest);
  writeGroupedDocs(groups);
  console.log(`Wrote ${slides.length} slide entries to ${manifestPath}`);
  console.log(`Generated ${groups.length} grouped folders under ${generatedGroupsRoot}`);
}

createManifest();








