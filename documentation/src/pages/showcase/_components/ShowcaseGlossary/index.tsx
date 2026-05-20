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
import { TagList, LanguageTagList, type TagType } from '@site/src/data/showcase';
import {getGlossaryTagMetadata} from '@site/src/data/showcaseGlossary';

export function TagDot({color}: {color: string}) {
  return <span className={styles.tagDot} style={{backgroundColor: color}} aria-hidden />;
}

export default function ShowcaseGlossary(): ReactNode {
  const languageTags = LanguageTagList;
  const categoryTags = TagList.filter((t) => !languageTags.includes(t));

  // Combined ordered list: categories then languages (as before)
  const allTags: TagType[] = [...categoryTags.slice(0, 24), ...languageTags] as TagType[];

  // Batch loading configuration
  const BATCH_SIZE = 6; // number of items to load per batch

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
          const glossary = getGlossaryTagMetadata(tag);
          return (
            <div key={tag} className={styles.entry}>
              <div className={styles.entryHeader}>
                <TagDot color={glossary.color} />
                <strong className={styles.entryLabel}>{glossary.label}</strong>
              </div>
              <div className={styles.entryDesc}>
                {glossary.description}
                <span>
                  {' '}
                  <a href={glossary.wikiUrl} target="_blank" rel="noopener noreferrer" className={styles.learnMore} aria-label={`Learn more about ${glossary.label} on Wikipedia`}>
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
