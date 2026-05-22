/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import {Tags} from '@site/src/data/showcase';
import {
  useApplyDetectedSearchTag,
  useDetectedSearchTags,
  useSearchName,
} from '@site/src/pages/showcase/_utils';
import styles from './styles.module.css';

export default function ShowcaseSearchBar(): ReactNode {
  const [searchName, setSearchName] = useSearchName();
  const detectedTags = useDetectedSearchTags();
  const applyDetectedTag = useApplyDetectedSearchTag();

  return (
    <div className={styles.searchBar}>
      <input
        placeholder={translate({
          message: 'Search for site name...',
          id: 'showcase.searchBar.placeholder',
        })}
        value={searchName}
        onInput={(e) => {
          setSearchName(e.currentTarget.value);
        }}
      />
      {detectedTags.length > 0 && (
        <div
          className={styles.detectedFilters}
          aria-label={translate({
            id: 'showcase.searchBar.detectedFiltersRegion',
            message: 'Detected filters',
          })}>
          <span className={styles.detectedFiltersLabel}>
            {translate({
              id: 'showcase.searchBar.detectedFilters',
              message: 'Detected filters',
            })}
          </span>
          <div className={styles.detectedFilterList}>
            {detectedTags.map(({tag, matchedAlias}) => (
              <button
                key={tag}
                type="button"
                className={styles.detectedFilterChip}
                onClick={() => applyDetectedTag(tag, matchedAlias)}
                aria-label={translate(
                  {
                    id: 'showcase.searchBar.applyDetectedFilter',
                    message: 'Apply detected filter {filterName}',
                  },
                  {filterName: Tags[tag].label},
                )}>
                {Tags[tag].label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
