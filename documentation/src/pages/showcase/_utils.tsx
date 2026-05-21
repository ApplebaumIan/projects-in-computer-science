/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useCallback, useMemo} from 'react';
import {translate} from '@docusaurus/Translate';
import {
  usePluralForm,
  useQueryString,
  useQueryStringList,
} from '@docusaurus/theme-common';
import type {TagType, User} from '@site/src/data/showcase';
import {sortedUsers} from '@site/src/data/showcase';

export function useSearchName() {
  return useQueryString('name');
}

export function useTags() {
  return useQueryStringList('tags');
}

export function useCohort() {
  return useQueryString('cohort');
}

type Operator = 'OR' | 'AND';

export function useOperator() {
  const [searchOperator, setSearchOperator] = useQueryString('operator');
  const operator: Operator = searchOperator === 'AND' ? 'AND' : 'OR';
  const toggleOperator = useCallback(() => {
    const newOperator = operator === 'OR' ? 'AND' : null;
    setSearchOperator(newOperator);
  }, [operator, setSearchOperator]);
  return [operator, toggleOperator] as const;
}

function filterUsers({
  users,
  tags,
  operator,
  searchName,
  cohort,
}: {
  users: User[];
  tags: TagType[];
  operator: Operator;
  searchName: string | null;
  cohort?: string | null;
}) {
  if (searchName) {
    const normalizedSearch = searchName.toLowerCase();
    // eslint-disable-next-line no-param-reassign
    users = users.filter((user) => {
      const searchableFields = [user.title, ...(user.members ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return searchableFields.includes(normalizedSearch);
    });
  }
  if (cohort) {
    users = users.filter((user) => semesterToCohort(user.semester) === cohort);
  }
  if (tags.length === 0) {
    return users;
  }
  return users.filter((user) => {
    if (user.tags.length === 0) {
      return false;
    }
    if (operator === 'AND') {
      return tags.every((tag) => user.tags.includes(tag));
    }
    return tags.some((tag) => user.tags.includes(tag));
  });
}

export function useFilteredUsers() {
  const [tags] = useTags();
  const [searchName] = useSearchName();
  const [operator] = useOperator();
  const [cohort] = useCohort();
  return useMemo(
    () =>
      filterUsers({
        users: sortedUsers,
        tags: tags as TagType[],
        operator,
        searchName,
        cohort,
      }),
    [tags, operator, searchName, cohort],
  );
}

// Return users filtered by the current searchName/cohort but ignoring tag selection.
// This is useful to compute per-tag counts without circular dependency on current tag selection.
export function useUsersForCounts() {
  const [searchName] = useSearchName();
  const [cohort] = useCohort();
  return useMemo(
    () =>
      filterUsers({
        users: sortedUsers,
        tags: [],
        operator: 'OR',
        searchName,
        cohort,
      }),
    [searchName, cohort],
  );
}

export function useUsersForCohortCounts() {
  const [tags] = useTags();
  const [searchName] = useSearchName();
  const [operator] = useOperator();
  return useMemo(
    () =>
      filterUsers({
        users: sortedUsers,
        tags: tags as TagType[],
        operator,
        searchName,
      }),
    [tags, operator, searchName],
  );
}

function parseSemester(sem?: string | null) {
  if (!sem) return null;
  const parts = sem.split(/\s+/);
  if (parts.length < 2) return null;
  const season = parts[0].toLowerCase();
  const year = parseInt(parts[1], 10);
  if (!Number.isFinite(year)) return null;
  return {season, year};
}

export function semesterToCohort(sem?: string | null) {
  const parsed = parseSemester(sem);
  if (!parsed) return null;
  return String(parsed.season === 'fall' ? parsed.year + 1 : parsed.year);
}

export function cohortToAcademicYearLabel(cohort?: string | null) {
  if (!cohort) return '';
  const endYear = Number.parseInt(cohort, 10);
  if (!Number.isFinite(endYear)) return cohort;
  return `${endYear - 1} - ${endYear}`;
}

// Helper: compute a sortable numeric key from semester strings like "Spring 2025"
function semesterKey(sem?: string | null) {
  const parsed = parseSemester(sem);
  if (!parsed) return -Infinity;
  const {year, season} = parsed;
  const seasonOrder: Record<string, number> = {
    spring: 0,
    summer: 1,
    fall: 2,
    winter: 3,
  };
  const s = seasonOrder[season] ?? 4;
  // Compose key: year * 10 + seasonOrder, so newer years are larger.
  return (Number.isFinite(year) ? year : 0) * 10 + s;
}

// Export a memoized sorted version of filtered users by semester (descending)
export function useFilteredAndSortedUsers() {
  const filtered = useFilteredUsers();
  return useMemo(() => {
    return [...filtered].sort((a, b) => semesterKey(b.semester) - semesterKey(a.semester));
  }, [filtered]);
}

export function useSiteCountPlural() {
  const {selectMessage} = usePluralForm();
  return (sitesCount: number) =>
    selectMessage(
      sitesCount,
      translate(
        {
          id: 'showcase.filters.resultCount',
          description:
            'Pluralized label for the number of projects found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 project|{sitesCount} projects',
        },
        {sitesCount},
      ),
    );
}
