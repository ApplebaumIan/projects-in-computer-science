/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {type User} from '@site/src/data/showcase';
import Heading from '@theme/Heading';
import ShowcaseCard from '../ShowcaseCard';
import {semesterToCohort, useFilteredAndSortedUsers} from '../../_utils';

import styles from './styles.module.css';

function HeadingNoResult() {
  return (
    <Heading as="h2">
      <Translate id="showcase.usersList.noResult">No result</Translate>
    </Heading>
  );
}

function semesterSortKey(semester?: string) {
  if (!semester) return Infinity;
  const [seasonRaw = '', yearRaw = '0'] = semester.split(/\s+/);
  const year = Number.parseInt(yearRaw, 10);
  const season = seasonRaw.toLowerCase();
  const seasonOrder: Record<string, number> = {
    fall: 0,
    spring: 1,
    summer: 2,
    winter: 3,
  };
  return ((Number.isFinite(year) ? year : 0) * 10) + (seasonOrder[season] ?? 9);
}

function getCohortGroups(items: User[]) {
  const groups = new Map<string, User[]>();
  items.forEach((item) => {
    const cohort = semesterToCohort(item.semester) ?? 'Archive';
    const group = groups.get(cohort);
    if (group) {
      group.push(item);
    } else {
      groups.set(cohort, [item]);
    }
  });

  return [...groups.entries()].sort(([cohortA], [cohortB]) => {
    if (cohortA === 'Archive') return 1;
    if (cohortB === 'Archive') return -1;
    return Number(cohortB) - Number(cohortA);
  });
}

function CohortSection({cohort, items}: {cohort: string; items: User[]}) {
  const semesters = Array.from(
    new Set(items.map((item) => item.semester).filter(Boolean)),
  ).sort((a, b) => semesterSortKey(a) - semesterSortKey(b)) as string[];

  return (
    <section
      id={`showcase-cohort-${cohort}`}
      className={styles.yearSection}
      aria-labelledby={`showcase-cohort-heading-${cohort}`}>
      <div className={clsx('container', styles.yearSectionLayout)}>
        <div className={styles.yearSectionHeader}>
          <Heading as="h2" id={`showcase-cohort-heading-${cohort}`} className={styles.yearSectionTitle}>
            {cohort}
          </Heading>
          <p className={styles.projectCount}>{items.length} project{items.length === 1 ? '' : 's'}</p>
          {semesters.length > 0 && (
            <ul className={clsx('clean-list', styles.semesterList)}>
              {semesters.map((semester) => (
                <li key={semester} className={styles.semesterPill}>
                  {semester}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <ul className={clsx('clean-list', styles.cardList)}>
            {items.map((item) => (
              <ShowcaseCard key={item.title} user={item} contributorsColumns={5} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function NoResultSection() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container padding-vert--md text--center">
        <HeadingNoResult />
      </div>
    </section>
  );
}

export default function ShowcaseCards() {
  const filteredUsers = useFilteredAndSortedUsers();

  if (filteredUsers.length === 0) {
    return <NoResultSection />;
  }

  const groupedUsers = getCohortGroups(filteredUsers);

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {groupedUsers.map(([cohort, items]) => (
        <CohortSection key={cohort} cohort={cohort} items={items} />
      ))}
      <p style={{textAlign: 'center', padding: 40}}>
        Contributor Icons Made with
        <a href={'https://contrib.rocks'}> contrib.rocks</a>.
        <br />
        This page&apos;s design borrows heavily from
        <a href={'https://docusaurus.io/showcase'}> Facebook&apos;s Docusaurus Site Showcase</a>
        {' '}
        Page.
      </p>
    </section>
  );
}
