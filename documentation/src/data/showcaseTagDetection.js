const TAG_ALIAS_MAP = {
  aac: [
    'aac',
    'augmentative and alternative communication',
  ],
  accessibility: [
    'accessibility',
    'accessible',
  ],
  ai: [
    'ai',
    'artificial intelligence',
    'machine learning',
  ],
  api: [
    'api',
    'apis',
    'backend',
    'back end',
    'service',
    'services',
    'rest',
    'rest api',
    'rest apis',
  ],
  'computer-vision': [
    'computer vision',
    'cv',
    'vision',
  ],
  education: [
    'education',
    'edtech',
    'learning',
  ],
  embedded: [
    'embedded',
    'embedded system',
    'embedded systems',
    'firmware',
  ],
  game: [
    'game',
    'games',
  ],
  gaming: [
    'gaming',
  ],
  javascript: [
    'javascript',
    'js',
  ],
  mobile: [
    'mobile',
    'mobile app',
    'mobile apps',
  ],
  ml: [
    'ml',
    'machine learning',
  ],
  pwa: [
    'pwa',
    'progressive web app',
    'progressive web apps',
  ],
  python: [
    'python',
  ],
  react: [
    'react',
    'reactjs',
    'react app',
    'react apps',
  ],
  robotics: [
    'robotics',
    'robotic',
    'robot',
    'robots',
  ],
  web: [
    'web',
    'web app',
    'web apps',
    'website',
    'websites',
  ],
};

function normalizeSearchText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function phraseIndex(normalizedSearch, phrase) {
  if (!normalizedSearch || !phrase) {
    return -1;
  }

  const haystack = ` ${normalizedSearch} `;
  const needle = ` ${phrase} `;
  return haystack.indexOf(needle);
}

function uniqueAliases(values) {
  return [...new Set(values.map(normalizeSearchText).filter(Boolean))];
}

function buildTagAliasMap() {
  return Object.fromEntries(
    Object.entries(TAG_ALIAS_MAP).map(([tag, aliases]) => [
      tag,
      uniqueAliases([tag, ...aliases]),
    ]),
  );
}

const NORMALIZED_TAG_ALIAS_MAP = buildTagAliasMap();
const FILLER_TERMS = new Set([
  'project',
  'projects',
  'app',
  'apps',
  'system',
  'systems',
  'demo',
  'demos',
]);

function detectTagsFromSearch(searchInput) {
  const normalizedSearch = normalizeSearchText(searchInput);

  if (!normalizedSearch) {
    return [];
  }

  const matches = Object.entries(NORMALIZED_TAG_ALIAS_MAP)
    .map(([tag, aliases]) => {
      const hit = aliases
        .map((alias) => ({
          alias,
          index: phraseIndex(normalizedSearch, alias),
        }))
        .filter((candidate) => candidate.index >= 0)
        .sort((a, b) => {
          if (a.index !== b.index) {
            return a.index - b.index;
          }

          return b.alias.length - a.alias.length;
        })[0];

      if (!hit) {
        return null;
      }

      return {
        tag,
        matchedAlias: hit.alias,
        index: hit.index,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.index !== b.index) {
        return a.index - b.index;
      }

      return a.tag.localeCompare(b.tag);
    });

  return matches;
}

function activateDetectedTag(currentTags, tag) {
  if (currentTags.includes(tag)) {
    return currentTags;
  }

  return [...currentTags, tag];
}

function cleanupSearchAfterTagActivation(searchInput, matchedAlias) {
  const rawInput = String(searchInput ?? '').trim();
  const rawAlias = String(matchedAlias ?? '').trim();

  if (!rawInput || !rawAlias) {
    return rawInput;
  }

  const escapedAlias = rawAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const aliasRegex = new RegExp(`(^|[^a-z0-9])${escapedAlias}([^a-z0-9]|$)`, 'i');
  const withoutAlias = rawInput.replace(aliasRegex, (match, prefix = '', suffix = '') => {
    const safePrefix = /[a-z0-9]/i.test(prefix) ? prefix : ' ';
    const safeSuffix = /[a-z0-9]/i.test(suffix) ? suffix : ' ';
    return `${safePrefix}${safeSuffix}`;
  });

  const normalized = withoutAlias
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) {
    return '';
  }

  const remainingTerms = normalizeSearchText(normalized)
    .split(' ')
    .filter(Boolean);

  if (remainingTerms.length > 0 && remainingTerms.every((term) => FILLER_TERMS.has(term))) {
    return '';
  }

  return normalized;
}

module.exports = {
  TAG_ALIAS_MAP,
  NORMALIZED_TAG_ALIAS_MAP,
  normalizeSearchText,
  detectTagsFromSearch,
  activateDetectedTag,
  cleanupSearchAfterTagActivation,
};
