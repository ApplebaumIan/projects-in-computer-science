/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useCallback} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Image from '@theme/IdealImage';
import {Tags, TagList, type TagType, type User} from '@site/src/data/showcase';
import {sortBy} from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import FavoriteIcon from '../FavoriteIcon';
import styles from './styles.module.css';
import Contributors from '../../../../components/Contributors';

function TagItem({
  label,
  description,
  color,
}: {
  label: string;
  description: string;
  color: string;
}) {
  return (
    <li className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{backgroundColor: color}} />
    </li>
  );
}

function ShowcaseCardTag({tags}: {tags: TagType[]}) {
  const tagObjects = tags.map((tag) => {
    const meta = Tags[tag as TagType];
    if (meta) return {tag, ...meta};
    // Fallback metadata when tag is missing from Tags map
    return {tag, label: String(tag), description: '', color: '#999'};
  });

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        // Ensure label is a string before passing to TagItem
        const {label = String(tagObject.tag), description = '', color = '#999'} = tagObject as any;
        return <TagItem key={index} label={String(label)} description={description} color={color} />;
      })}
    </>
  );
}

function getCardImage(user: User): string {
  return (
    user.preview ??
    // TODO make it configurable
    `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
      user.useDocsAsPreview ? user.website : user.documentation,
    )}/showcase`
  );
}

function makeSlug(s: string) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function ShowcaseCard({user}: {user: User}) {
  const image = getCardImage(user);
  const [expanded, setExpanded] = useState(false);
  const MAX = 150;
  const desc = user.description ?? '';
  const isLong = desc.length > MAX;
  const cardId = user.slug ?? makeSlug(user.title);
  return (
    <li id={cardId} data-slug={cardId} key={user.title} className="card shadow--md">
      <div className={clsx('card__image', styles.showcaseCardImage)}>
        <Image img={image} alt={user.title} />
      </div>
      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link href={user.website} className={styles.showcaseCardLink}>
              {user.title}
            </Link>
            <button
              type="button"
              title={`Copy link to ${user.title}`}
              aria-label={`Copy link to ${user.title}`}
              className={styles.shareBtn}
              onClick={useCallback((e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  if (typeof window !== 'undefined') {
                    const origin =
                      window.location.origin ||
                      `${window.location.protocol}//${window.location.host}`;
                    const url = `${origin}/showcase#${cardId}`;
                    const doToast = () => {
                      try {
                        const toast = document.createElement('div');
                        toast.className = 'share-toast';
                        toast.textContent = 'Link copied to clipboard';
                        document.body.appendChild(toast);
                        // force reflow then show
                        // eslint-disable-next-line no-unused-expressions
                        toast.offsetHeight;
                        toast.classList.add('show');
                        setTimeout(() => {
                          toast.classList.remove('show');
                          setTimeout(
                            () => document.body.removeChild(toast),
                            300,
                          );
                        }, 1800);
                      } catch (err) {
                        // ignore UI toast errors
                      }
                    };

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(url).then(doToast, doToast);
                    } else {
                      // fallback using temporary input
                      const input = document.createElement('input');
                      input.value = url;
                      document.body.appendChild(input);
                      input.select();
                      document.execCommand('copy');
                      document.body.removeChild(input);
                      doToast();
                    }
                  }
                } catch (err) {
                  // ignore copy errors
                }
              }, [cardId])}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </Heading>
          {user.tags.includes('favorite') && (
            <FavoriteIcon size="medium" style={{marginRight: '0.25rem'}} />
          )}

          {/* Website button (deployed app) */}
          {user.website && (
            <Link
              href={user.website}
              className={clsx('button button--secondary button--sm', styles.showcaseCardBtn)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open website for ${user.title}`}
              title={`Open website for ${user.title}`}
            >
              <span className={styles.buttonContent}>
                <svg className={styles.actionIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M14 3v2h3.59L10 12.59 11.41 14 19 6.41V10h2V3h-7z" />
                  <path d="M5 5h5V3H3v7h2z" />
                </svg>
                <span className={styles.buttonText}><Translate id="showcase.card.websiteLink">website</Translate></span>
              </span>
            </Link>
          )}

          {/* Documentation button */}
          {user.documentation && (
            <Link
              href={user.documentation}
              className={clsx('button button--secondary button--sm', styles.showcaseCardBtn)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open documentation for ${user.title}`}
              title={`Open documentation for ${user.title}`}
            >
              <span className={styles.buttonContent}>
                <svg className={styles.actionIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M18 2H6C4.9 2 4 2.9 4 4v16l8-3 8 3V4c0-1.1-.9-2-2-2z" />
                </svg>
                <span className={styles.buttonText}><Translate id="showcase.card.documentationLink">documentation</Translate></span>
              </span>
            </Link>
          )}

          {/* Demo video button */}
          {user.demo && (
            <Link
              href={user.demo}
              className={clsx('button button--secondary button--sm', styles.showcaseCardBtn)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open demo video for ${user.title}`}
              title={`Open demo video for ${user.title}`}
            >
              <span className={styles.buttonContent}>
                <svg className={styles.actionIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className={styles.buttonText}><Translate id="showcase.card.demoLink">demo</Translate></span>
              </span>
            </Link>
          )}

          {user.source && (
            <Link
              href={user.source}
              className={clsx(
                'button button--secondary button--sm',
                styles.showcaseCardSrcBtn,
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open source repository for ${user.title}`}
              title={`Open source repository for ${user.title}`}
            >
              <span className={styles.buttonContent}>
                <svg className={styles.actionIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.37 7.86 10.88.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.38-3.88-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.57.24 2.73.12 3.02.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.79 1.08.79 2.18 0 1.58-.01 2.86-.01 3.25 0 .31.21.68.8.56C20.71 21.37 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
                </svg>
                <span className={styles.buttonText}><Translate id="showcase.card.sourceLink">source</Translate></span>
              </span>
            </Link>
          )}
        </div>
        <p className={styles.showcaseCardBody}>
          {isLong ? (
            <>
              <span>{expanded ? desc : desc.slice(0, MAX) + '...'}</span>
              <button
                type="button"
                className={styles.readMoreBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setExpanded((s) => !s);
                }}
                aria-expanded={expanded}
              >
                {expanded ? 'Read less' : 'Read more'}
              </button>
            </>
          ) : (
            desc
          )}
        </p>
      </div>
      <ul className={clsx('card__footer', styles.cardFooter)}>
        <ShowcaseCardTag tags={user.tags} />
          <Contributors githubURL={user.source}/>

      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
