import {Tags, type TagType} from '@site/src/data/showcase';

const WIKI_OVERRIDES: Record<string, string> = {
  AI: 'Artificial_intelligence',
  ML: 'Machine_learning',
  PWA: 'Progressive_web_app',
  API: 'Application_programming_interface',
  IoT: 'Internet_of_things',
  AAC: 'Augmentative_and_alternative_communication',
  LLMs: 'Large_language_model',
  'Next.js': 'Next.js',
  TypeScript: 'TypeScript',
  WebGL: 'WebGL',
  React: 'React_(JavaScript_library)',
  TensorFlow: 'TensorFlow',
  PyTorch: 'PyTorch',
  SQLite: 'SQLite',
  PostgreSQL: 'PostgreSQL',
  MongoDB: 'MongoDB',
  C: 'C_(programming_language)',
  'C#': 'C_Sharp_(programming_language)',
  'C++': 'C%2B%2B',
  Go: 'Go_(programming_language)',
  R: 'R_(programming_language)',
  Ruby: 'Ruby_(programming_language)',
  Java: 'Java_(programming_language)',
  Swift: 'Swift_(programming_language)',
  'Objective-C': 'Objective-C',
  MATLAB: 'MATLAB',
  Dart: 'Dart_(programming_language)',
  Slack: 'Slack_(software)',
  Bun: 'Bun_(software)',
  Phaser: 'Phaser_(game_framework)',
};

export function wikipediaUrlForLabel(label?: string) {
  if (!label) {
    return 'https://en.wikipedia.org/wiki/Special:Search';
  }

  const override = WIKI_OVERRIDES[label];
  if (override) {
    return `https://en.wikipedia.org/wiki/${override}`;
  }

  const title = label.replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

export function getGlossaryTagMetadata(tag: string) {
  const meta = Tags[tag as TagType];
  const label = meta?.label ?? tag;
  const description = meta?.description ?? '';
  const color = meta?.color ?? '#999';

  return {
    color,
    description,
    label,
    wikiUrl: wikipediaUrlForLabel(label),
  };
}
