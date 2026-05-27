import type {ReactNode} from 'react';
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

type ViewMode = 'grid' | 'carousel';
type TogglePlacement = 'bottomRight';

function GridIcon(): ReactNode {
  return (
    <svg
      className={styles.toggleIcon}
      viewBox="0 0 24 24"
      aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function CarouselIcon(): ReactNode {
  return (
    <svg
      className={styles.toggleIcon}
      viewBox="0 0 48 48"
      aria-hidden="true">
        {/*<rect width="48" height="48" fill="white" fill-opacity="0.01"/>*/}
        <rect x="11" y="7" width="26" height="34"   stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="4" y="11" width="7" height="26"   stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="37" y="11" width="7" height="26"   stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 20L28 24L22 28V20Z" fill="#43CCF8"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

function ToggleItem({
  active,
  to,
  label,
  icon,
}: {
  active: boolean;
  to: string;
  label: string;
  icon: ReactNode;
}) {
  if (active) {
    return (
      <span
        className={clsx(styles.toggleButton, styles.toggleButtonActive)}
        aria-current="page"
        title={label}>
        {icon}
        <span className={styles.srOnly}>{label}</span>
      </span>
    );
  }

  return (
    <Link
      className={styles.toggleButton}
      to={to}
      aria-label={label}
      title={label}>
      {icon}
      <span className={styles.srOnly}>{label}</span>
    </Link>
  );
}

export default function ViewModeToggle({
  activeView,
  placement = 'bottomRight',
}: {
  activeView: ViewMode;
  placement?: TogglePlacement;
}): ReactNode {
  return (
    <nav
      className={clsx(styles.toggleShell, styles[placement])}
      aria-label="Choose showcase view">
      <ToggleItem
        active={activeView === 'grid'}
        to="/showcase"
        label="Grid view"
        icon={<GridIcon />}
      />
      <ToggleItem
        active={activeView === 'carousel'}
        to="/showcase/carousel"
        label="Carousel view"
        icon={<CarouselIcon />}
      />
    </nav>
  );
}
