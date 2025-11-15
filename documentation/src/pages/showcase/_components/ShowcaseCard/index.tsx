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

function parseYoutubeUrl(url: string): {
  videoId: string | null;
  startTime: string | null;
} {
  if (!url) {
    return {videoId: null, startTime: null};
  }
  const videoIdRegex =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const videoIdMatch = url.match(videoIdRegex);
  const videoId =
    videoIdMatch && videoIdMatch[2].length === 11 ? videoIdMatch[2] : null;

  const timeRegex = /[?&](?:t|start)=(\d+)/;
  const timeMatch = url.match(timeRegex);
  const startTime = timeMatch ? timeMatch[1] : null;

  return {videoId, startTime};
}

function ShowcaseCard({user, contributorsColumns = 4}: {user: User; contributorsColumns?: number}) {
  const image = getCardImage(user);
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const {videoId: youtubeVideoId, startTime} = parseYoutubeUrl(user.demo);

  const MAX = 150;
  const desc = user.description ?? '';
  const isLong = desc.length > MAX;
  const cardId = user.slug ?? makeSlug(user.title);
  return (
    <li id={cardId} data-slug={cardId} key={user.title} className="card shadow--md">
      <div
        className={clsx('card__image', styles.showcaseCardImage)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {isHovered && youtubeVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1${
              startTime ? `&start=${startTime}` : ''
            }`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.youtubeEmbed}
          />
        ) : (
          <Image img={image} alt={user.title} />
        )}
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
                <svg className={styles.actionIcon} viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z"/>
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
                <path d="M2.462 22.201h12.321a2.466 2.466 0 0 0 2.369-1.854c.026.004.052.008.079.008a.621.621 0 0 0 .615-.615.621.621 0 0 0-.615-.615c-.027 0-.053.004-.079.007l-.014-.055a.62.62 0 0 0 .378-.568.621.621 0 0 0-.615-.615.608.608 0 0 0-.371.127l-.042-.041a.606.606 0 0 0 .125-.368c0-.67-.919-.858-1.181-.241l-.055-.014c.003-.026.008-.052.008-.079a.622.622 0 0 0-.616-.615.621.621 0 0 0-.615.615h-.096a.617.617 0 0 0-1.033 0h-.717v-2.461h2.461c.115 0 .226-.017.331-.047a.307.307 0 1 0 .529-.304l.02-.021c.052.04.116.064.186.064h.002c.337 0 .428-.463.117-.591l.007-.028c.013.001.026.004.039.004a.31.31 0 0 0 .308-.308.31.31 0 0 0-.308-.308c-.013 0-.026.003-.039.004a.28.28 0 0 1-.007-.027c.327-.13-.028-.745-.305-.528l-.02-.021a.307.307 0 0 0 .062-.184c-.011-.326-.454-.416-.591-.12a1.238 1.238 0 0 0-.32-.047h-2.143a2.465 2.465 0 0 1 2.132-1.23h7.385V9.894l-8.618-.539a1.315 1.315 0 0 1-1.229-1.308c0-.688.542-1.265 1.229-1.307l8.618-.539v-1.23a2.473 2.473 0 0 0-2.462-2.462H8.615l-.307-.533a.356.356 0 0 0-.616 0l-.307.533-.308-.533a.355.355 0 0 0-.615 0l-.308.533-.308-.533a.355.355 0 0 0-.615 0l-.308.533-.008.001-.51-.51a.354.354 0 0 0-.594.159l-.168.628-.639-.171a.357.357 0 0 0-.436.435l.172.639-.628.169a.356.356 0 0 0-.16.594l.51.51v.008l-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308a2.463 2.463 0 0 1-2.13-1.231A2.465 2.465 0 0 0 0 19.74c0 1.35 1.112 2.46 2.462 2.461zm19.692-5.204v2.743a2.473 2.473 0 0 1-2.461 2.461h-.001 1.231a2.466 2.466 0 0 0 2.383-1.854c.026.004.052.008.079.008A.621.621 0 0 0 24 19.74a.621.621 0 0 0-.615-.615c-.027 0-.053.004-.079.007l-.014-.055a.62.62 0 0 0 .378-.568.621.621 0 0 0-.615-.615.608.608 0 0 0-.371.127l-.042-.041a.612.612 0 0 0 .125-.368.623.623 0 0 0-.613-.615zm-4.067 2.62h2.223c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-2.223a.845.845 0 0 0 0-.246zm-.33-1.231h2.553c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-2.553a.845.845 0 0 0 0-.246zm-1.026-1.231h3.579c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-3.474a.85.85 0 0 0-.105-.246zm3.579-.984h-6.159a.126.126 0 0 1-.123-.123c0-.068.056-.123.123-.123h6.159c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123zm1.844-3.816v2.462c.115 0 .225-.017.331-.047a.308.308 0 1 0 .528-.304l.021-.021c.052.04.116.064.186.064a.312.312 0 0 0 .307-.308.306.306 0 0 0-.189-.283l.007-.028c.013.001.026.004.04.004a.312.312 0 0 0 .307-.308.312.312 0 0 0-.307-.308c-.014 0-.027.003-.04.004l-.007-.027a.31.31 0 0 0-.118-.592.306.306 0 0 0-.186.064l-.021-.021a.3.3 0 0 0 .063-.184c-.011-.326-.454-.416-.591-.12a1.24 1.24 0 0 0-.321-.047zm-6.059 2.339h4.215c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-4.451a.564.564 0 0 0 .073-.19.553.553 0 0 0 .163-.056zm.454-1.208h3.761c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-3.772a.552.552 0 0 0 .011-.246zm5.605-6.225h-.004c-.381.013-.561.393-.719.729-.166.35-.294.578-.504.572-.233-.009-.366-.271-.506-.549-.162-.32-.347-.682-.734-.668-.375.013-.556.344-.715.636-.169.311-.285.5-.507.491-.237-.008-.363-.222-.509-.469-.163-.275-.351-.585-.731-.574-.368.013-.549.294-.709.542-.169.262-.287.421-.513.412-.243-.009-.368-.186-.513-.391-.163-.231-.347-.491-.726-.479-.36.013-.541.243-.701.446-.151.192-.27.344-.52.335h-.005a.126.126 0 0 0-.123.123c0 .066.053.121.119.123.371.012.559-.222.723-.429.145-.184.27-.343.516-.352.237-.01.348.138.516.375.16.226.341.482.705.495.382.013.566-.273.729-.525.145-.226.271-.421.511-.429.22-.008.34.166.51.453.159.271.34.577.712.59.385.014.57-.322.732-.619.14-.257.273-.5.507-.508.221-.005.336.196.506.533.159.314.339.67.717.684h.021c.377 0 .556-.378.714-.713.14-.297.273-.576.501-.588zM7.385 6.509a.312.312 0 0 1-.308-.308c-.01-.532-.378-.911-.927-.922-.528-.011-.888.432-.919.922-.011.168-.139.307-.308.308a.31.31 0 0 1-.308-.308c0-.848.69-1.538 1.539-1.538.848 0 1.538.69 1.538 1.538a.312.312 0 0 1-.307.308zm9.846-2.308a.31.31 0 0 1 .308.308.31.31 0 0 1-.308.308.31.31 0 0 1-.308-.308.31.31 0 0 1 .308-.308zm2.461-.153a.31.31 0 0 1 .307.308.31.31 0 0 1-.308.308h-.001a.31.31 0 0 1-.307-.308.31.31 0 0 1 .308-.308z"/>

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
                <svg className={styles.actionIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
        {/* Tags (each already rendered as <li>) */}
        <ShowcaseCardTag tags={user.tags} />
        {/* Contributors wrapped in a list item for valid HTML and layout control */}
        <li className={styles.contributorsItem}>
          <Contributors githubURL={user.source} columns={contributorsColumns} />
        </li>
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
