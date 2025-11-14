const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../documentation/src/data/showcase.ts');
const src = fs.readFileSync(file, 'utf8');

function extractTagList(text){
  const m = text.match(/export const TagList:[\s\S]*?=\s*\[([\s\S]*?)\];/m);
  if(!m) return [];
  const inner = m[1];
  const tags = [];
  const re = /'([^']+)'/g;
  let r;
  while((r = re.exec(inner))){ tags.push(r[1]); }
  return tags;
}

function extractProjectTags(text){
  const reArray = /tags\s*:\s*\[([^\]]*)\]/g;
  const tags = new Set();
  let m;
  while((m = reArray.exec(text))){
    const inner = m[1];
    const re = /'([^']+)'/g;
    let r;
    while((r = re.exec(inner))){ tags.add(r[1]); }
  }
  return Array.from(tags);
}

const tagList = extractTagList(src);
const projectTags = extractProjectTags(src);

const tagSet = new Set(tagList);
const missingInTagList = projectTags.filter(t => !tagSet.has(t));
const unusedInProjects = tagList.filter(t => !projectTags.includes(t));

console.log('TagList count:', tagList.length);
console.log('Project distinct tag count:', projectTags.length);
console.log('Tags used in projects but missing from TagList:', missingInTagList);
console.log('Tags present in TagList but not used by any project:', unusedInProjects);

if(missingInTagList.length===0){
  console.log('All project tags are declared in TagList.');
} else {
  console.error('Missing tags need attention.');
  process.exitCode = 2;
}

