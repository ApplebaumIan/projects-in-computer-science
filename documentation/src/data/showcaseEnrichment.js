const rawProjects = require('./showcaseProjects');
const languagesMapping = require('./showcaseLanguages.json');
const categoryHints = require('./showcaseCategoryHints.json');

const KNOWN_TAGS = new Set([
  'aac',
  'ai',
  'analytics',
  'ar',
  'autonomous',
  'accessibility',
  'bioinformatics',
  'bluetooth',
  'canvas-lms',
  'chatbot',
  'collaboration',
  'code-quality',
  'community',
  'computer-vision',
  'devops',
  'discordBot',
  'education',
  'embedded',
  'gamification',
  'game',
  'gaming',
  'geolocation',
  'github',
  'hardware',
  'health',
  'fitness',
  'interview-prep',
  'iot',
  'jira',
  'llms',
  'ml',
  'mobile',
  'multiplayer',
  'puzzle',
  'parking',
  'pwa',
  'raspberry-pi',
  'research',
  'robotics',
  'safety',
  'sensors',
  'slack',
  'social',
  'unity',
  'vscode-extension',
  'virtual-pet',
  'web',
  'webgl',
  'api',
  'library',
  'speech-to-text',
  'laravel',
  'nextjs',
  'react',
  'django',
  'flask',
  'sqlite',
  'postgresql',
  'mongodb',
  'tensorflow',
  'pytorch',
  'typescript',
  'javascript',
  'python',
  'csharp',
  'cpp',
  'shell',
  'swift',
  'go',
  'kotlin',
  'php',
  'c',
  'java',
  'ruby',
  'rust',
  'dart',
  'lua',
  'dockerfile',
  'docker-compose',
  'jupyter-notebook',
  'matlab',
  'r',
  'objective-c',
  'haskell',
  'perl',
  'node',
  'websocket',
  'k8s',
  'redis',
  'bun',
  'phaser',
]);

function normalizeGeneratedTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map((tag) => String(tag).toLowerCase())
    .filter((tag) => KNOWN_TAGS.has(tag));
}

function mergeGeneratedTagsIntoProject(project) {
  try {
    const generatedLanguageTags = normalizeGeneratedTags(
      languagesMapping[project.slug ?? ''],
    );
    const generatedCategoryTags = normalizeGeneratedTags(
      categoryHints[project.slug ?? ''],
    );

    if (
      generatedLanguageTags.length === 0 &&
      generatedCategoryTags.length === 0
    ) {
      return project;
    }

    return {
      ...project,
      tags: Array.from(
        new Set([
          ...(project.tags || []),
          ...generatedLanguageTags,
          ...generatedCategoryTags,
        ]),
      ),
    };
  } catch {
    return project;
  }
}

function enrichProjects(projects) {
  return projects.map(mergeGeneratedTagsIntoProject);
}

const enrichedProjects = enrichProjects(rawProjects);

module.exports = {
  KNOWN_TAGS,
  mergeGeneratedTagsIntoProject,
  enrichProjects,
  enrichedProjects,
};
