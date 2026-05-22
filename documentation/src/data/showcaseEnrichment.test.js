const test = require('node:test');
const assert = require('node:assert/strict');

const {
  enrichedProjects,
  mergeGeneratedTagsIntoProject,
} = require('./showcaseEnrichment');

test('generated language and category tags are merged into showcase projects', () => {
  const project = enrichedProjects.find(
    (entry) => entry.slug === 'code-battlegrounds',
  );

  assert.ok(project);
  assert.ok(project.tags.includes('typescript'));
  assert.ok(project.tags.includes('postgresql'));
  assert.ok(project.tags.includes('nextjs'));
  assert.ok(project.tags.includes('k8s'));
  assert.ok(project.tags.includes('collaboration'));
});

test('generated tags are normalized and filtered to known showcase tags', () => {
  const merged = mergeGeneratedTagsIntoProject({
    slug: 'code-battlegrounds',
    tags: ['education'],
  });

  assert.ok(merged.tags.includes('education'));
  assert.ok(merged.tags.includes('typescript'));
  assert.equal(merged.tags.includes('socket.io'), false);
});
