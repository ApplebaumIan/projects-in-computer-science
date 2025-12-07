/**
 * Glossary component for the Showcase filters.
 */

import React from 'react';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { TagList, LanguageTagList, Tags, type TagType } from '@site/src/data/showcase';

function TagDot({color}: {color: string}) {
  return <span className={styles.tagDot} style={{backgroundColor: color}} aria-hidden />;
}

// Small mapping for labels that need different Wikipedia article titles.
const WIKI_OVERRIDES: Record<string, string> = {
  AI: 'Artificial_intelligence',
  ML: 'Machine_learning',
  PWA: 'Progressive_web_app',
  API: 'Application_programming_interface',
  IoT: 'Internet_of_things',
  AAC: 'Augmentative_and_alternative_communication',
  LLMs: 'Large_language_model',
  'Next.js': 'Next.js',
  'TypeScript': 'TypeScript',
  'WebGL': 'WebGL',
  'React': 'React_(JavaScript_library)',
  'TensorFlow': 'TensorFlow',
  'PyTorch': 'PyTorch',
  'SQLite': 'SQLite',
  'PostgreSQL': 'PostgreSQL',
  'MongoDB': 'MongoDB',
  // Ambiguous/special-character language names -> point to programming language pages
  'C': 'C_(programming_language)',
    'C#': 'C_Sharp_(programming_language)',
  'C++': 'C%2B%2B',
  'Go': 'Go_(programming_language)',
  'R': 'R_(programming_language)',
    'Ruby': 'Ruby_(programming_language)',
  'Java': 'Java_(programming_language)',
  'Swift': 'Swift_(programming_language)',
  'Objective-C': 'Objective-C',
  'MATLAB': 'MATLAB',
    'Dart': 'Dart_(programming_language)',
};

// Utility to build a Wikipedia URL from a label. It first checks overrides for a known
// article title; otherwise it uses the label as the article title with spaces replaced
// by underscores and proper URI encoding.
function wikipediaUrlForLabel(label?: string) {
  if (!label) return 'https://en.wikipedia.org/wiki/Special:Search';
  const override = WIKI_OVERRIDES[label];
  if (override) {
    // override is expected to be a valid article path segment (may include percent-encoding)
    return `https://en.wikipedia.org/wiki/${override}`;
  }
  const title = label.replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

export default function ShowcaseGlossary(): JSX.Element {
  const languageTags = LanguageTagList;
  // Show category tags first (exclude language tags)
  const categoryTags = TagList.filter((t) => !languageTags.includes(t));

  // For readability, display a compact set: top category tags followed by language tags
  const compactCategory = categoryTags.slice(0, 24); // cap to avoid extremely long lists

  return (
    <section id="showcase-glossary" className="margin-top--lg margin-bottom--lg">
      <div className="container">
        <Heading as="h3">
          <Translate id="showcase.glossary.title">Glossary</Translate>
        </Heading>
        <p className={styles.intro}>
          <Translate id="showcase.glossary.intro">
            Helpful explanations for the topic and language filters used on this page.
          </Translate>
        </p>
      </div>
      <div className={styles.grid}>
        {compactCategory.map((tag) => {
          const meta = Tags[tag as TagType];
          const wiki = wikipediaUrlForLabel(meta?.label);
          return (
            <div key={tag} className={styles.entry}>
              <div className={styles.entryHeader}>
                <TagDot color={meta.color} />
                <strong className={styles.entryLabel}>{meta.label}</strong>
              </div>
              <div className={styles.entryDesc}>
                {meta.description}
                <span>
                  {' '}
                  <a
                    href={wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.learnMore}
                    aria-label={`Learn more about ${meta.label} on Wikipedia`}
                  >
                    <Translate id="showcase.glossary.learnMore">Learn more</Translate>
                  </a>
                </span>
              </div>
            </div>
          );
        })}
        {/* Add language tags at end */}
        {languageTags.map((tag) => {
          const meta = Tags[tag as TagType];
          const wiki = wikipediaUrlForLabel(meta?.label);
          return (
            <div key={tag} className={styles.entry}>
              <div className={styles.entryHeader}>
                <TagDot color={meta.color} />
                <strong className={styles.entryLabel}>{meta.label}</strong>
              </div>
              <div className={styles.entryDesc}>
                {meta.description}
                <span>
                  {' '}
                  <a
                    href={wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.learnMore}
                    aria-label={`Learn more about ${meta.label} on Wikipedia`}
                  >
                    <Translate id="showcase.glossary.learnMore">Learn more</Translate>
                  </a>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
