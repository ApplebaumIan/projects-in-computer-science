import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import type {Props} from '@theme/DocPaginator';

type PaginatorLink = NonNullable<Props['previous']>;

export default function DocPaginator(props: Props): ReactNode {
  const {className, previous} = props;
  let {next} = props as Props & {next?: PaginatorLink};

  const {siteConfig} = useDocusaurusContext();
  const isPdf =
    String(siteConfig.customFields?.is_pdf ?? '').toLowerCase() === 'true' ||
    String(siteConfig.customFields?.is_pdf ?? '') === '1';

  let frontMatter: Record<string, boolean | string | undefined> | undefined;

  try {
    // This paginator is reused in a few places that are not wrapped in a
    // DocProvider, so keep the old fallback behavior instead of throwing.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const docHookResult = useDoc();
    frontMatter = docHookResult?.metadata?.frontMatter as
      | Record<string, boolean | string | undefined>
      | undefined;
  } catch {
    frontMatter = undefined;
  }

  if (frontMatter && isPdf && typeof frontMatter.pdfNext === 'string') {
    next = {
      permalink: frontMatter.pdfNext,
      title:
        (frontMatter.pdfNextTitle as string | undefined) ??
        (frontMatter.nextTitle as string | undefined) ??
        'Next',
    };
  } else if (frontMatter && typeof frontMatter.next === 'string') {
    next = {
      permalink: frontMatter.next,
      title: (frontMatter.nextTitle as string | undefined) ?? 'Next',
    };
  }

  const shouldHideNextCompletely = Boolean(
    frontMatter &&
      (frontMatter.hideNext === true ||
        frontMatter.hidePaginationNext === true ||
        frontMatter.hidePagination === true),
  );

  const shouldHideNextVisually = Boolean(
    frontMatter &&
      (frontMatter.hidePaginationNextVisually === true ||
        frontMatter.hideNextVisually === true),
  );

  if (shouldHideNextCompletely || (shouldHideNextVisually && !isPdf)) {
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
        <div
          className={clsx(
            shouldHideNextVisually && isPdf && 'pdf-crawler-only',
          )}>
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
        </div>
      )}
    </nav>
  );
}
