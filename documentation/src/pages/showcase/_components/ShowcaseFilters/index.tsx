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
import {Tags, TagList, type TagType, LanguageTagList} from '@site/src/data/showcase';
import Heading from '@theme/Heading';
import ShowcaseTagSelect from '../ShowcaseTagSelect';
import OperatorButton from '../OperatorButton';
import ClearAllButton from '../ClearAllButton';
import {
  cohortToAcademicYearLabel,
  semesterToCohort,
  useCohort,
  useFilteredUsers,
  useSiteCountPlural,
  useUsersForCohortCounts,
  useUsersForCounts,
} from '../../_utils';

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

// New generic list that can render either language tags or category tags separately
function GenericTagList({tags, id}: {tags: TagType[]; id: string}) {
  const usersForCounts = useUsersForCounts();
  const tagCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tag of tags) map[tag] = 0;
    for (const u of usersForCounts) {
      for (const t of u.tags ?? []) {
        if (map[t] !== undefined) map[t] += 1;
      }
    }
    return map as Record<TagType, number>;
  }, [usersForCounts, tags]);
  (GenericTagList as any).tagCounts = tagCounts;
  // Remove zero-count tags (unless none would remain)
  const nonZero = tags.filter(t => (tagCounts[t] ?? 0) > 0);
  const displayTags = nonZero.length > 0 ? nonZero : tags; // fallback to showing all if all zero
  // Order by count desc, then alphabetical
  const ordered = useMemo(() => {
    return [...displayTags].sort((a, b) => {
      const ca = tagCounts[a] ?? 0;
      const cb = tagCounts[b] ?? 0;
      if (cb !== ca) return cb - ca;
      return a.localeCompare(b);
    });
  }, [displayTags, tagCounts]);
  return (
    <ul id={id} className={clsx('clean-list', styles.tagList)}>
      {ordered.map((tag) => (
        <li key={tag} className={styles.tagListItem}>
          <ShowcaseTagSelect
            tag={tag}
            label={Tags[tag].label}
            description={Tags[tag].description}
            count={tagCounts[tag] ?? 0}
            icon={<TagCircleIcon color={Tags[tag].color} style={{marginLeft: 8}} />}
          />
        </li>
      ))}
    </ul>
  );
}

function ShowcaseTagList() {
  // Separate tag groups
  const languageTags = LanguageTagList;
  const categoryTags = TagList.filter((t) => !languageTags.includes(t));

  // Existing truncation logic applies only to category tags (usually larger set)
  const usersForCounts = useUsersForCounts();
  const tagCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tag of categoryTags) map[tag] = 0;
    for (const u of usersForCounts) {
      for (const t of u.tags ?? []) {
        if (map[t] !== undefined) map[t] += 1;
      }
    }
    return map as Record<TagType, number>;
  }, [usersForCounts, categoryTags]);
  (ShowcaseTagList as any).tagCounts = tagCounts;
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_COUNT = 8;
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
  const orderedCategoryTags = useMemo(() => {
    // Exclude zero-count tags first (unless that would remove all tags)
    const nonZero = categoryTags.filter(t => (tagCounts[t] ?? 0) > 0);
    const base = nonZero.length > 0 ? nonZero : categoryTags;
    return [...base].sort((a, b) => {
      const ca = tagCounts[a] ?? 0;
      const cb = tagCounts[b] ?? 0;
      if (cb !== ca) return cb - ca;
      const ia = TOP_TAGS.indexOf(a);
      const ib = TOP_TAGS.indexOf(b);
      if (ia !== -1 || ib !== -1) {
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
      }
      return a.localeCompare(b);
    });
  }, [tagCounts, categoryTags]);

  const total = orderedCategoryTags.length;
  const shouldTruncate = total > VISIBLE_COUNT && !expanded;
  const visibleCategoryTags = shouldTruncate ? orderedCategoryTags.slice(0, VISIBLE_COUNT) : orderedCategoryTags;
  const moreCount = Math.max(0, total - VISIBLE_COUNT);
  const moreLabel = translate({
    id: 'showcase.filters.showMore',
    message: `Show ${moreCount} more`,
    values: {count: moreCount},
  });
  const lessLabel = translate({id: 'showcase.filters.showLess', message: 'Show less'});

  return (
    <div>
      <GenericTagList id="showcase-language-tags" tags={languageTags} />
      {/*<Heading as="h3" style={{marginTop: '2rem'}}>Topics & Categories</Heading>*/}
      <ul id="showcase-more-tags" className={clsx('clean-list', styles.tagList)}>
        {visibleCategoryTags.map((tag) => {
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

function GlossaryShortcut() {
  function goToGlossary() {
    try {
      window.dispatchEvent(new Event('showcase:loadGlossary'));

      const scrollTo = () => {
        const el = document.getElementById('showcase-glossary');
        if (!el) {
          return false;
        }
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
        window.setTimeout(() => {
          try {
            (el as HTMLElement).focus();
          } catch (e) {
            // ignore if focus isn't supported in the environment
          }
        }, 400);
        return true;
      };

      if (scrollTo()) return;

      let attempts = 0;
      const timer = window.setInterval(() => {
        attempts += 1;
        if (scrollTo() || attempts >= 40) {
          clearInterval(timer);
        }
      }, 100);
    } catch (e) {
      // ignore in SSR or restricted environments
    }
  }

  let glossaryPrefetched = false;

  function prefetchGlossary() {
    if (glossaryPrefetched) return;
    glossaryPrefetched = true;
    import('../ShowcaseGlossary').catch(() => {
      // ignore failures; load will be attempted again when requested
    });
  }

  return (
    <button
      type="button"
      className={styles.glossaryButton}
      onClick={goToGlossary}
      onMouseEnter={prefetchGlossary}
      aria-controls="showcase-glossary"
      aria-label={translate({id: 'showcase.filters.gotoGlossary', message: 'Go to glossary'})}
    >
      {translate({id: 'showcase.filters.gotoGlossaryContext', message: 'Filter glossary'})}
    </button>
  );
}

function CohortFilters() {
  const [cohort, setCohort] = useCohort();
  const usersForCounts = useUsersForCohortCounts();
  const cohortOptions = useMemo(() => {
    const counts = new Map<string, number>();
    usersForCounts.forEach((user) => {
      const label = semesterToCohort(user.semester);
      if (!label) return;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    return [...counts.entries()]
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([label, count]) => ({label, count}));
  }, [usersForCounts]);

  if (cohortOptions.length <= 1) {
    return null;
  }

  return (
    <div className={styles.cohortFilters}>
      <span className={styles.cohortLabel}>Academic year</span>
      <ul className={clsx('clean-list', styles.cohortList)}>
        {cohortOptions.map(({label, count}) => {
          const selected = cohort === label;
          return (
            <li key={label}>
              <button
                type="button"
                className={clsx(styles.cohortButton, selected && styles.cohortButtonActive)}
                aria-pressed={selected}
                onClick={() => setCohort(selected ? null : label)}>
                <span>{cohortToAcademicYearLabel(label)}</span>
                <span className={styles.cohortCount}>{count}</span>
              </button>
            </li>
          );
        })}
      </ul>
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
      <CohortFilters />
      <ShowcaseTagList />
      <div className={styles.filterFooter}>
        <GlossaryShortcut />
      </div>
    </section>
  );
}
