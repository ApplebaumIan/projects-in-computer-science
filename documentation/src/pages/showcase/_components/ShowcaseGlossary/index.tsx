/**
 * Glossary component for the Showcase filters.
 *
 * Behavior:
 * - Header and intro are rendered immediately.
 * - Entries are loaded in batches when the glossary enters the viewport and as the
 *   user scrolls (IntersectionObserver on a sentinel element).
 * - A "Load more" button is provided as a fallback for browsers without IntersectionObserver
 *   or if JavaScript is slow.
 */

import {useEffect, useRef, useState, type ReactNode} from 'react';
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

function wikipediaUrlForLabel(label?: string) {
  if (!label) return 'https://en.wikipedia.org/wiki/Special:Search';
  const override = WIKI_OVERRIDES[label];
  if (override) return `https://en.wikipedia.org/wiki/${override}`;
  const title = label.replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

export default function ShowcaseGlossary(): ReactNode {
  const languageTags = LanguageTagList;
  const categoryTags = TagList.filter((t) => !languageTags.includes(t));

  // Combined ordered list: categories then languages (as before)
  const allTags: TagType[] = [...categoryTags.slice(0, 24), ...languageTags] as TagType[];

  // Batch loading configuration
  const BATCH_SIZE = 9; // number of items to load per batch

  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  // Helper: load next batch
  function loadNextBatch() {
    setVisibleCount((prev) => {
      const next = Math.min(allTags.length, prev + BATCH_SIZE);
      return next;
    });
  }

  // When the section first enters the viewport -> load first batch
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;
    if ((window as any).IntersectionObserver) {
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!loadedOnce) {
              loadNextBatch();
              setLoadedOnce(true);
              // Announce load
              if (liveRef.current) {
                liveRef.current.textContent = `${Math.min(allTags.length, BATCH_SIZE)} glossary items loaded`;
              }
            }
            io.disconnect();
            break;
          }
        }
      }, {root: null, rootMargin: '0px', threshold: 0.1});
      io.observe(sectionRef.current);
      return () => io.disconnect();
    } else {
      // No IntersectionObserver: eagerly load first batch
      if (!loadedOnce) {
        loadNextBatch();
        setLoadedOnce(true);
        if (liveRef.current) {
          liveRef.current.textContent = `${Math.min(allTags.length, BATCH_SIZE)} glossary items loaded`;
        }
      }
    }
  }, [loadedOnce]);

  // Observe sentinel to load more batches as user scrolls within the glossary
  useEffect(() => {
    if (typeof window === 'undefined' || !sentinelRef.current) return;
    if ((window as any).IntersectionObserver) {
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // load next batch
            setVisibleCount((prev) => {
              const newCount = Math.min(allTags.length, prev + BATCH_SIZE);
              if (liveRef.current) {
                liveRef.current.textContent = `${newCount} of ${allTags.length} glossary items loaded`;
              }
              return newCount;
            });
          }
        }
      }, {root: null, rootMargin: '200px', threshold: 0.1});
      io.observe(sentinelRef.current);
      return () => io.disconnect();
    }
    return;
  }, [sentinelRef.current]);

  // Accessibility: announce when all items are loaded
  useEffect(() => {
    if (visibleCount >= allTags.length && liveRef.current) {
      liveRef.current.textContent = `All ${allTags.length} glossary items loaded`;
    }
  }, [visibleCount]);

  // Items to render
  const visibleTags = allTags.slice(0, visibleCount);

  return (
    <section
      id="showcase-glossary"
      className="container margin-top--lg margin-bottom--lg"
      ref={sectionRef}
      tabIndex={-1}
    >
      <Heading as="h3">
        <Translate id="showcase.glossary.title">Glossary</Translate>
      </Heading>
      <p className={styles.intro}>
        <Translate id="showcase.glossary.intro">Helpful explanations for the topic and language filters used on this page.</Translate>
      </p>

      {/* Live region for accessibility */}
      <div ref={liveRef} aria-live="polite" style={{position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, overflow: 'hidden'}} />

      <div className={styles.grid}>
        {visibleTags.map((tag) => {
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
                  <a href={wiki} target="_blank" rel="noopener noreferrer" className={styles.learnMore} aria-label={`Learn more about ${meta.label} on Wikipedia`}>
                    <Translate id="showcase.glossary.learnMore">Learn more</Translate>
                  </a>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sentinel observed by IntersectionObserver to trigger loading more */}
      <div ref={sentinelRef} />

      {/* Fallback load more button for older browsers or to allow manual loading */}
      {visibleCount < allTags.length && (
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
          <button
            type="button"
            onClick={() => {
              loadNextBatch();
            }}
            className={styles.learnMore}
          >
            <Translate id="showcase.glossary.loadMore">Load more</Translate>
          </button>
        </div>
      )}
    </section>
  );
}
