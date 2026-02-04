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
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
const {siteConfig} = useDocusaurusContext();
const isPdf =
        String(siteConfig.customFields?.is_pdf || '').toLowerCase() === 'true' ||
        String(siteConfig.customFields?.is_pdf || '') === '1';

    try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const docHookResult = useDoc();
    metadata = docHookResult?.metadata;
    // IMPORTANT: frontMatter is a property on metadata
    frontMatter = metadata?.frontMatter;
  } catch (e) {
    // Not in a DocProvider context — fall back to no frontMatter.
    metadata = undefined;
    frontMatter = undefined;
  }

  // Optional: allow doc to override next link
    // If PDF build and doc defines pdfNext, prefer that
    if (frontMatter && isPdf && typeof frontMatter.pdfNext === 'string') {
        next = {
            permalink: frontMatter.pdfNext,
            title:
                (frontMatter.pdfNextTitle as string) ??
                (frontMatter.nextTitle as string) ??
                'Next',
        } as any;
    } else if (frontMatter && typeof frontMatter.next === 'string') {
    next = {
      permalink: frontMatter.next,
      title: (frontMatter.nextTitle as string) ?? 'Next',
    } as any;
  }

  const shouldHideNextCompletely = !!(
      frontMatter && (
          frontMatter.hideNext === true ||
          frontMatter.hidePaginationNext === true ||
          frontMatter.hidePagination === true
      )
  );

  // NEW: hide next visually but keep it in DOM for crawlers
  const shouldHideNextVisually = !!(
      frontMatter && (
          frontMatter.hidePaginationNextVisually === true ||
          frontMatter.hideNextVisually === true
      )
  );

  if (shouldHideNextCompletely) {
    next = undefined;
  }

  return (
      <nav
          className={clsx(className, 'pagination-nav')}
          aria-label={translate({
            id: 'theme.docs.paginator.navAriaLabel',
            message: 'Docs pages',
            description: 'The ARIA label for the docs pagination',
          })}
      >
        {previous && (
            <PaginatorNavLink
                {...previous}
                subLabel={
                  <Translate id="theme.docs.paginator.previous">
                    Previous
                  </Translate>
                }
            />
        )}

        {next && (
            <div
                className={clsx(
                    shouldHideNextVisually && 'pdf-crawler-only'
                )}
            >
              <PaginatorNavLink
                  {...next}
                  subLabel={
                    <Translate id="theme.docs.paginator.next">
                      Next
                    </Translate>
                  }
                  isNext
              />
            </div>
        )}
      </nav>
  );
}
