const test = require('node:test');
const assert = require('node:assert/strict');
const {
  detectTagsFromSearch,
  activateDetectedTag,
  cleanupSearchAfterTagActivation,
} = require('./showcaseTagDetection');

test('detects exact tag names from search text', () => {
  const detected = detectTagsFromSearch('AI projects');
  assert.deepEqual(
    detected.map((entry) => entry.tag),
    ['ai'],
  );
});

test('detects aliases from search text', () => {
  const detected = detectTagsFromSearch('best embedded systems ideas');
  assert.deepEqual(
    detected.map((entry) => entry.tag),
    ['embedded'],
  );
});

test('detects plural aliases cleanly', () => {
  const detected = detectTagsFromSearch('AAC games for students');
  assert.deepEqual(
    detected.map((entry) => entry.tag),
    ['aac', 'game'],
  );
});

test('detects multiple tags from one query', () => {
  const detected = detectTagsFromSearch('React mobile app for education');
  assert.deepEqual(
    detected.map((entry) => entry.tag),
    ['react', 'mobile', 'education'],
  );
});

test('activation adds detected tags without duplicating existing filters', () => {
  assert.deepEqual(activateDetectedTag(['ai'], 'ai'), ['ai']);
  assert.deepEqual(activateDetectedTag(['ai'], 'react'), ['ai', 'react']);
});

test('search cleanup removes the activated tag keyword when it is safe', () => {
  assert.equal(cleanupSearchAfterTagActivation('AI projects', 'ai'), '');
  assert.equal(
    cleanupSearchAfterTagActivation('embedded systems robotics', 'embedded systems'),
    'robotics',
  );
});

test('normal text search remains possible when no tags are detected', () => {
  const detected = detectTagsFromSearch('vibecheck slack prompts');
  assert.deepEqual(
    detected.map((entry) => entry.tag),
    [],
  );
});
