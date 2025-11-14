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

// Semester hook (single-value): store selected semester in the query string
export function useSemester() {
  return useQueryString('semester');
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
  semester,
}: {
  users: User[];
  tags: TagType[];
  operator: Operator;
  searchName: string | null;
  semester?: string | null;
}) {
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    users = users.filter((user) =>
      user.title.toLowerCase().includes(searchName.toLowerCase()),
    );
  }
  if (semester) {
    users = users.filter((user) => user.semester === semester);
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
  const [semester] = useSemester();
  return useMemo(
    () =>
      filterUsers({
        users: sortedUsers,
        tags: tags as TagType[],
        operator,
        searchName,
        semester,
      }),
    [tags, operator, searchName, semester],
  );
}

// Helper: compute a sortable numeric key from semester strings like "Spring 2025"
function semesterKey(sem?: string | null) {
  if (!sem) return -Infinity;
  const parts = sem.split(/\s+/);
  if (parts.length < 2) return -Infinity;
  const year = parseInt(parts[1], 10);
  const season = parts[0].toLowerCase();
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
            'Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 site|{sitesCount} sites',
        },
        {sitesCount},
      ),
    );
}
