/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReactNode, CSSProperties} from 'react';
import clsx from 'clsx';
import {useState, useMemo} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import FavoriteIcon from '@site/src/pages/showcase/_components/FavoriteIcon';
import {Tags, TagList, type TagType} from '@site/src/data/showcase';
import Heading from '@theme/Heading';
import ShowcaseTagSelect from '../ShowcaseTagSelect';
import OperatorButton from '../OperatorButton';
import ClearAllButton from '../ClearAllButton';
import {useFilteredUsers, useSiteCountPlural, useSemester, useUsersForCounts} from '../../_utils';
import {sortedUsers} from '@site/src/data/showcase';

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
  // tag count will be provided via closure in ShowcaseTagList
  return (
    <li className={styles.tagListItem}>
      <ShowcaseTagSelect
        tag={tag}
        label={label}
        description={description}
        count={(ShowcaseTagList as any).tagCounts?.[tag] ?? 0}
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
  // Users used to compute counts respect the current search and semester,
  // but ignore tag selection so counts reflect how many projects would match
  // each tag given the other active constraints.
  const usersForCounts = useUsersForCounts();
  // Build a lookup of tag -> count
  const tagCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tag of TagList) {
      map[tag] = 0;
    }
    for (const u of usersForCounts) {
      for (const t of u.tags ?? []) {
        if (map[t] !== undefined) map[t] += 1;
      }
    }
    return map as Record<TagType, number>;
  }, [usersForCounts]);
  // Attach counts to the function so child list items can read it (minimal change)
  (ShowcaseTagList as any).tagCounts = tagCounts;
  const [expanded, setExpanded] = useState(false);
  // Number of tags to show before the "Show more" button appears
  const VISIBLE_COUNT = 8;

  // Configure which tags should appear first when counts tie (secondary priority)
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

  // Order tags primarily by count (descending), then by TOP_TAGS order, then alphabetically
  const orderedTags = useMemo(() => {
    return [...TagList].sort((a, b) => {
      const ca = tagCounts[a] ?? 0;
      const cb = tagCounts[b] ?? 0;
      if (cb !== ca) return cb - ca; // larger counts first
      const ia = TOP_TAGS.indexOf(a);
      const ib = TOP_TAGS.indexOf(b);
      if (ia !== -1 || ib !== -1) {
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib; // keep TOP_TAGS relative order
      }
      return a.localeCompare(b);
    });
  }, [tagCounts]);

  const total = orderedTags.length;
  const shouldTruncate = total > VISIBLE_COUNT && !expanded;
  const visibleTags = shouldTruncate ? orderedTags.slice(0, VISIBLE_COUNT) : orderedTags;

  const moreCount = Math.max(0, total - VISIBLE_COUNT);
  const moreLabel = translate({
    id: 'showcase.filters.showMore',
    message: `Show ${moreCount} more`,
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
  const [semester, setSemester] = useSemester();

  // Build semester options from sortedUsers (unique, non-empty)
  const semesterOptions = useMemo(() => {
    const set = new Set<string>();
    for (const u of sortedUsers) {
      if (u.semester) set.add(u.semester);
    }
    // Convert to array and sort using a simple comparator that prefers newer semesters
    const arr = Array.from(set);
    const seasonOrder: Record<string, number> = { spring: 0, summer: 1, fall: 2, winter: 3 };
    arr.sort((a, b) => {
      const pa = a.split(/\s+/);
      const pb = b.split(/\s+/);
      const ya = parseInt(pa[1] || '0', 10);
      const yb = parseInt(pb[1] || '0', 10);
      if (ya !== yb) return yb - ya;
      const sa = seasonOrder[(pa[0] || '').toLowerCase()] ?? 4;
      const sb = seasonOrder[(pb[0] || '').toLowerCase()] ?? 4;
      return sb - sa;
    });
    return arr;
  }, []);

  return (
    <div className={styles.headingButtons} style={{alignItems: 'center'}}>
      <OperatorButton />
      <div style={{display: 'flex', alignItems: 'center'}}>
        <label htmlFor="semester-select" style={{marginRight: 8, fontSize: '0.9rem'}}>Semester</label>
        <select
          id="semester-select"
          value={semester ?? ''}
          onChange={(e) => setSemester(e.target.value || null)}
          className={styles.semesterSelect}
        >
          <option value="">All</option>
          {semesterOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
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
