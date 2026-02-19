import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';

import type {Props} from '@theme/DocCard';
import Heading from '@theme/Heading';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

function iconForKey(key?: string): ReactNode {
  switch (key) {
    case 'community':
      return '🤝';
    case 'accessibility':
      return '🗣️💬';
    case 'edtech':
      return '👩‍🏫💻';
    case 'tools':
      return '👥️🛠';
    case 'impact':
      return '🌐';
    case 'learn':
        return '🧠';
    case 'tip':
        return '💡';
    case 'warning':
        return '⚠️';
    case 'example':
        return '📚';
    case 'best-practice':
        return '🏆';
    default:
      return null;
  }
}

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}

function CardContainer({
  className,
  href,
  children,
  affordanceLabel,
}: {
  className?: string;
  href: string;
  children?: ReactNode;
  affordanceLabel?: string;
}): ReactNode {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer, className)}>
      {children}
      {/* affordance cue shown on hover/focus; label supplied via customProps.affordanceText */}
      <span className={styles.cardAffordance} aria-hidden="true">
        <span className={styles.cardAffordanceLabel}>{affordanceLabel ?? 'Explore this section'}</span>
        <span className={styles.cardAffordanceArrow}>→</span>
      </span>
    </Link>
  );
}

function CardLayout({
  className,
  href,
  icon,
  title,
  description,
  affordanceLabel,
}: {
  className?: string;
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
  affordanceLabel?: string;
}): ReactNode {
  return (
    <CardContainer href={href} className={className} affordanceLabel={affordanceLabel}>
      <Heading
        as="h2"
        className={clsx('text--truncate', styles.cardTitle)}
        title={title}>
        {icon} {title}
      </Heading>
      {description && (
        <p
          className={clsx('text--truncate', styles.cardDescription)}
          title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  if (!href) return null;

  const iconKey = (item as any)?.customProps?.icon as string | undefined;
  const customIcon = iconForKey(iconKey);
  const affordanceLabel = (item as any)?.customProps?.affordanceText as string | undefined;

  return (
      <CardLayout
          className={item.className}
          href={href}
          icon={customIcon ?? '🗂️'}
          title={item.label}
          description={item.description ?? categoryItemsPlural(item.items.length)}
          affordanceLabel={affordanceLabel}
      />
  );
}


function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const doc = useDocById(item.docId ?? undefined);

  const iconKey = (item as any)?.customProps?.icon as string | undefined;
  const customIcon = iconForKey(iconKey);
  // prefer affordance text from the doc's front matter, then fall back to sidebar item's customProps
  const affordanceLabel = (doc as any)?.frontMatter?.affordanceText as string |
    undefined || (item as any)?.customProps?.affordanceText as string | undefined;

  const fallbackIcon = isInternalUrl(item.href) ? '📄️' : '🔗';

  return (
      <CardLayout
          className={item.className}
          href={item.href}
          icon={customIcon ?? fallbackIcon}
          title={item.label}
          description={item.description ?? doc?.description}
          affordanceLabel={affordanceLabel}
      />
  );
}



export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
