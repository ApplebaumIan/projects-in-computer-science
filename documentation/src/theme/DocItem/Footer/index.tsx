import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TagsListInline from '@theme/TagsListInline';

import EditMetaRow from '@theme/EditMetaRow';

// Override DocItem Footer to only show the Edit link when frontMatter.showEdit === true
export default function DocItemFooter(): ReactNode {
  const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags, frontMatter} = metadata;

  const canDisplayTagsRow = tags.length > 0;

  // Use front matter flag `showEdit: true` to decide whether to display the edit link.
  // If the flag is omitted or false, the edit link will not be shown.
  const showEdit = !!(frontMatter && frontMatter.showEdit === true);

  // Only pass editUrl through when this doc's frontMatter explicitly allows it
  const effectiveEditUrl = editUrl && showEdit ? editUrl : undefined;

  const canDisplayEditMetaRow = !!(effectiveEditUrl || lastUpdatedAt || lastUpdatedBy);

  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {canDisplayTagsRow && (
        <div
          className={clsx('row margin-top--sm', ThemeClassNames.docs.docFooterTagsRow)}>
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx('margin-top--sm', ThemeClassNames.docs.docFooterEditMetaRow)}
          editUrl={effectiveEditUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
    </footer>
  );
}
