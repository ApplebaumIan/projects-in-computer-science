/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useCallback} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import {
  Tags,
  TagList,
  getProjectCardAnchorIds,
  getProjectDetailPath,
  getProjectImage,
  type TagType,
  type User,
} from '@site/src/data/showcase';
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

function OverflowTag({projectPath}: {projectPath: string}) {
  return (
    <li className={clsx(styles.tag, styles.showMoreTag)}>
      <Link to={projectPath} className={styles.showMoreTagLink}>
        Show more
      </Link>
      <span className={styles.colorLabel} style={{backgroundColor: 'grey'}} />
    </li>
  );
}

export function ShowcaseCardTag({
  tags,
  projectPath,
}: {
  tags: TagType[];
  projectPath: string;
}) {
  const tagObjects = tags.map((tag) => {
    const meta = Tags[tag as TagType];
    if (meta) return {tag, ...meta};
    return {tag, label: String(tag), description: '', color: '#999'};
  });

  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );
  const MAX_VISIBLE_TAGS = 6;
  const hiddenTagCount = Math.max(0, tagObjectsSorted.length - MAX_VISIBLE_TAGS);
  const visibleTagObjects =
    hiddenTagCount > 0
      ? tagObjectsSorted.slice(0, MAX_VISIBLE_TAGS - 1)
      : tagObjectsSorted;

  return (
    <>
      {visibleTagObjects.map((tagObject, index) => {
        const {
          label = String(tagObject.tag),
          description = '',
          color = '#999',
        } = tagObject as any;
        return (
          <TagItem
            key={index}
            label={String(label)}
            description={description}
            color={color}
          />
        );
      })}
      {hiddenTagCount > 0 && <OverflowTag projectPath={projectPath} />}
    </>
  );
}

function getHighlightLabels(user: User): string[] {
  return Array.isArray(user.highlights) ? user.highlights.slice(0, 3) : [];
}

function ShowcaseCard({
  user,
  contributorsColumns = 4,
}: {
  user: User;
  contributorsColumns?: number;
}) {
  const image = getProjectImage(user);
  const members = user.members?.filter(Boolean) ?? [];
  const highlightLabels = getHighlightLabels(user);
  const projectPath = getProjectDetailPath(user);
  const anchorIds = getProjectCardAnchorIds(user);

  const MAX = 150;
  const desc = user.description ?? '';
  const descriptionPreview = desc.length > MAX ? `${desc.slice(0, MAX)}...` : desc;
  const [cardId, ...extraAnchorIds] = anchorIds;

  return (
    <li
      id={cardId}
      data-slug={user.slug}
      data-project-card="true"
      key={user.title}
      className="card shadow--md">
      {extraAnchorIds.map((anchorId) => (
        <span
          key={anchorId}
          id={anchorId}
          className="screen-reader-only"
          aria-hidden="true"
        />
      ))}
      <div className={clsx('card__image', styles.showcaseCardImage)}>
        {image && (
          <Link to={projectPath} aria-label={`Open details for ${user.title}`}>
            <Image img={image} alt={user.title} />
          </Link>
        )}
      </div>
      <div className="card__body">
        <div className={styles.showcaseCardHeader}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link to={projectPath} className={styles.showcaseCardLink}>
              {user.title}
            </Link>
            <button
              type="button"
              title={`Copy link to ${user.title}`}
              aria-label={`Copy link to ${user.title}`}
              className={styles.shareBtn}
              onClick={useCallback(
                (e: React.MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    if (typeof window !== 'undefined') {
                      const origin =
                        window.location.origin ||
                        `${window.location.protocol}//${window.location.host}`;
                      const url = `${origin}${projectPath}`;
                      const doToast = () => {
                        try {
                          const toast = document.createElement('div');
                          toast.className = 'share-toast';
                          toast.textContent = 'Link copied to clipboard';
                          document.body.appendChild(toast);
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
                },
                [projectPath],
              )}>
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
          {user.semester && (
            <span className={styles.semesterChipInline}>{user.semester}</span>
          )}
        </div>
        {highlightLabels.length > 0 && (
          <p className={styles.highlightSummary}>
            {highlightLabels.join(' · ')}
          </p>
        )}

        <div className={styles.showcaseCardSummary}>
          <p className={styles.showcaseCardBody}>{descriptionPreview}</p>
          <Link to={projectPath} className={styles.readMoreBtn}>
            Read more
          </Link>
        </div>
      </div>

      <ul className={clsx('card__footer', styles.cardFooter)}>
        <ShowcaseCardTag tags={user.tags} projectPath={projectPath} />
      </ul>
      {(user.source || members.length > 0) && (
        <div className={styles.contributorBlock}>
          {members.length > 0 && (
            <p className={styles.memberList}>{members.join(', ')}</p>
          )}
          {user.source && <Contributors githubURL={user.source} columns={10} />}
        </div>
      )}
    </li>
  );
}

export default React.memo(ShowcaseCard);
