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
import ShowcaseSearchBar from '@site/src/pages/showcase/_components/ShowcaseSearchBar';
import {Tags, TagList, type TagType} from '@site/src/data/showcase';
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

const DEFAULT_VISIBLE_FILTERS: TagType[] = [
  'javascript',
  'python',
  'react',
  'api',
  'web',
  'education',
  'ai',
  'embedded',
  'mobile',
  'pwa',
];

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

function ShowcaseTagListItem({
  tag,
  count,
}: {
  tag: TagType;
  count: number;
}) {
  const {label, description, color} = Tags[tag];
  return (
    <li className={styles.tagListItem}>
      <ShowcaseTagSelect
        tag={tag}
        label={label}
        description={description}
        count={count}
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

function GenericTagList({
  tags,
  id,
}: {
  tags: TagType[];
  id: string;
}) {
  return (
    <ul id={id} className={clsx('clean-list', styles.tagList)}>
      {tags.map((tag) => (
        <ShowcaseTagListItem
          key={tag}
          tag={tag}
          count={(ShowcaseTagList as any).tagCounts?.[tag] ?? 0}
        />
      ))}
    </ul>
  );
}

function ShowcaseTagList({
  showExtraFilters,
  extraFiltersId,
}: {
  showExtraFilters: boolean;
  extraFiltersId: string;
}) {
  const allTags = useMemo(
    () => [...new Set([...DEFAULT_VISIBLE_FILTERS, ...TagList])],
    [],
  );
  const usersForCounts = useUsersForCounts();
  const tagCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tag of allTags) map[tag] = 0;
    for (const u of usersForCounts) {
      for (const t of u.tags ?? []) {
        if (map[t] !== undefined) map[t] += 1;
      }
    }
    return map;
  }, [usersForCounts, allTags]);
  (ShowcaseTagList as any).tagCounts = tagCounts;

  const orderedTags = useMemo(() => {
    const nonZero = allTags.filter((tag) => (tagCounts[tag] ?? 0) > 0);
    const base = nonZero.length > 0 ? nonZero : allTags;
    return [...base].sort((a, b) => {
      const ca = tagCounts[a] ?? 0;
      const cb = tagCounts[b] ?? 0;
      if (cb !== ca) return cb - ca;
      return a.localeCompare(b);
    });
  }, [allTags, tagCounts]);

  const visibleTags = useMemo(() => {
    const curated = DEFAULT_VISIBLE_FILTERS.filter((tag) =>
      orderedTags.includes(tag),
    );
    const extras = orderedTags.filter((tag) => !curated.includes(tag));
    const visible = [...curated];
    for (const tag of extras) {
      if (visible.length >= 12) {
        break;
      }
      visible.push(tag);
    }
    return visible;
  }, [orderedTags]);

  const extraTags = useMemo(
    () => orderedTags.filter((tag) => !visibleTags.includes(tag)),
    [orderedTags, visibleTags],
  );

  return (
    <div>
      <GenericTagList id="showcase-primary-tags" tags={visibleTags} />
      <div
        id={extraFiltersId}
        className={clsx(styles.extraFilters, !showExtraFilters && styles.extraFiltersHidden)}
        hidden={!showExtraFilters}>
        {extraTags.length > 0 && (
          <GenericTagList id="showcase-extra-tags" tags={extraTags} />
        )}
      </div>
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
  return null;
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
      {translate({id: 'showcase.filters.gotoGlossaryContext', message: 'View filter glossary'})}
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
      <span className={styles.cohortLabel}>
        <Translate
            id="showcase.filters.cohortLabel"
            description={'Label for a cohort filter button, where the button label is the academic year. Example: "Filter by academic year 2022-2023"'}
        >
          Academic Year
        </Translate>
      </span>
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
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const extraFiltersId = 'showcase-extra-filters';
  const showMoreFiltersLabel = translate({
    id: 'showcase.filters.showAdvanced',
    message: 'Show all filters',
  });
  const hideMoreFiltersLabel = translate({
    id: 'showcase.filters.hideAdvanced',
    message: 'Hide extra filters',
  });

  return (
    <section className={`container ${styles.filtersSection}`}>
      <HeadingRow />
      <div className={styles.filtersShell}>
        <CohortFilters />
        <div className={styles.primaryControls}>
          <div className={styles.searchRow}>
            <ShowcaseSearchBar />
          </div>
          <div className={styles.controlButtons}>
            <OperatorButton />
            <ClearAllButton />
          </div>
        </div>
        <ShowcaseTagList
          showExtraFilters={showExtraFilters}
          extraFiltersId={extraFiltersId}
        />
        <div className={styles.filterFooter}>
          <button
            type="button"
            className={styles.advancedToggleButton}
            aria-expanded={showExtraFilters}
            aria-controls={extraFiltersId}
            onClick={() => setShowExtraFilters((value) => !value)}>
            {showExtraFilters ? hideMoreFiltersLabel : showMoreFiltersLabel}
          </button>
          <GlossaryShortcut />
        </div>
      </div>
    </section>
  );
}
