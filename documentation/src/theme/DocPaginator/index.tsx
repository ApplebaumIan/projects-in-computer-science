import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import type {Props} from '@theme/DocPaginator';
// useDoc throws a helpful error when called outside the DocProvider. During
// SSG some pages (category pages) may render this component without a
// provider. We keep the hook call but guard it with a try/catch so the
// paginator becomes a no-op when not inside docs context.
import {useDoc} from '@docusaurus/plugin-content-docs/client';

// Custom DocPaginator: honors front-matter flags to hide the "next" link for specific docs.
// Supported front-matter flags (any truthy):
// - hideNext
// - hidePaginationNext
// - hidePagination
// Additionally honors a `next` front-matter string to override the next link (e.g. `/syllabus/wrtiting-intensive`).

export default function DocPaginator(props: Props): ReactNode {
  const {className, previous} = props;
  let {next} = props as { next?: any };

  // Try to read doc metadata from the docs context. If this component is
  // rendered outside of a DocProvider (e.g. in category listing pages),
  // `useDoc()` will throw; gracefully handle that and treat the paginator
  // as if there is no frontMatter-controlled next link.
  let metadata: any | undefined;
  let frontMatter: Record<string, any> | undefined;
  try {
    // We call the hook unconditionally (hook rules preserved), but wrap it
    // so the thrown ReactContextError doesn't abort the build.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const docHookResult = useDoc();
    metadata = docHookResult?.metadata;
    frontMatter = metadata ?? {};
  } catch (e) {
    // Not in a DocProvider context — fall back to no frontMatter.
    metadata = undefined;
    frontMatter = undefined;
  }

  // If the doc defines a `next` front-matter string, prefer that as the next link.
  // frontMatter.next should be a permalink (absolute or site-relative). Optionally frontMatter.nextTitle
  // can provide a custom title for the link.
  if (frontMatter && typeof frontMatter.next === 'string') {
    next = {
      permalink: frontMatter.next,
      title: (frontMatter.nextTitle as string) ?? (frontMatter.next_label as string) ?? 'Next',
    } as any;
  }

  const shouldHideNext = !!(
    frontMatter && (
      frontMatter.hideNext === true ||
      frontMatter.hidePaginationNext === true ||
      frontMatter.hidePagination === true
    )
  );

  if (shouldHideNext) {
    next = undefined;
  }

  return (
    <nav
      className={clsx(className, 'pagination-nav')}
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}>
      {previous && (
        <PaginatorNavLink
          {...previous}
          subLabel={
            <Translate
              id="theme.docs.paginator.previous"
              description="The label used to navigate to the previous doc">
              Previous
            </Translate>
          }
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          subLabel={
            <Translate
              id="theme.docs.paginator.next"
              description="The label used to navigate to the next doc">
              Next
            </Translate>
          }
          isNext
        />
      )}
    </nav>
  );
}
