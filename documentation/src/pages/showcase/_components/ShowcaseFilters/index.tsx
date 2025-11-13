/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReactNode, CSSProperties} from 'react';
import clsx from 'clsx';
import {useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import FavoriteIcon from '@site/src/pages/showcase/_components/FavoriteIcon';
import {Tags, TagList, type TagType} from '@site/src/data/showcase';
import Heading from '@theme/Heading';
import ShowcaseTagSelect from '../ShowcaseTagSelect';
import OperatorButton from '../OperatorButton';
import ClearAllButton from '../ClearAllButton';
import {useFilteredUsers, useSiteCountPlural} from '../../_utils';

import styles from './styles.module.css';

function TagCircleIcon({color, style}: {color: string; style?: CSSProperties}) {
  return (
    <span
      style={{
        backgroundColor: color,
        width: 10,
        height: 10,
        borderRadius: '50%',
        ...style,
      }}
    />
  );
}

function ShowcaseTagListItem({tag}: {tag: TagType}) {
  const {label, description, color} = Tags[tag];
  return (
    <li className={styles.tagListItem}>
      <ShowcaseTagSelect
        tag={tag}
        label={label}
        description={description}
        icon={
          tag === 'favorite' ? (
            <FavoriteIcon size="small" style={{marginLeft: 8}} />
          ) : (
            <TagCircleIcon
              color={color}
              style={{
                backgroundColor: color,
                marginLeft: 8,
              }}
            />
          )
        }
      />
    </li>
  );
}

function ShowcaseTagList() {
  const [expanded, setExpanded] = useState(false);
  // Number of tags to show before the "Show more" button appears
  const VISIBLE_COUNT = 8;

  // Configure which tags should appear first (important filters). Edit this list
  // to change what's prioritized in the UI. Items must be TagType values.
  const TOP_TAGS: TagType[] = [
    'education',
    'game',
    'ai',
    'accessibility',
    'multiplayer',
    'ml',
    'web',
    'hardware',
  ];

  // Build an ordered list: top tags (in the order declared) followed by the rest
  const remaining = TagList.filter((t) => !TOP_TAGS.includes(t));
  const orderedTags = [
    ...TOP_TAGS.filter((t) => TagList.includes(t)),
    ...remaining,
  ];

  const total = orderedTags.length;
  const shouldTruncate = total > VISIBLE_COUNT && !expanded;
  const visibleTags = shouldTruncate ? orderedTags.slice(0, VISIBLE_COUNT) : orderedTags;

  const moreCount = Math.max(0, total - VISIBLE_COUNT);
  const moreLabel = translate({
    id: 'showcase.filters.showMore',
    message: 'Show {count} more',
    values: {count: moreCount},
  });
  const lessLabel = translate({id: 'showcase.filters.showLess', message: 'Show less'});

  return (
    <div>
      <ul id="showcase-more-tags" className={clsx('clean-list', styles.tagList)}>
        {visibleTags.map((tag) => {
          return <ShowcaseTagListItem key={tag} tag={tag} />;
        })}
      </ul>

      {total > VISIBLE_COUNT && (
        <div className={styles.showMoreRow}>
          <button
            className={styles.showMoreButton}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="showcase-more-tags"
          >
            {expanded ? lessLabel : moreLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function HeadingText() {
  const filteredUsers = useFilteredUsers();
  const siteCountPlural = useSiteCountPlural();
  return (
    <div className={styles.headingText}>
      <Heading as="h2">
        <Translate id="showcase.filters.title">Filters</Translate>
      </Heading>
      <span>{siteCountPlural(filteredUsers.length)}</span>
    </div>
  );
}

function HeadingButtons() {
  return (
    <div className={styles.headingButtons} style={{alignItems: 'center'}}>
      <OperatorButton />
      <ClearAllButton />
    </div>
  );
}

function HeadingRow() {
  return (
    <div className={clsx('margin-bottom--sm', styles.headingRow)}>
      <HeadingText />
      <HeadingButtons />
    </div>
  );
}

export default function ShowcaseFilters(): ReactNode {
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <HeadingRow />
      <ShowcaseTagList />
    </section>
  );
}
