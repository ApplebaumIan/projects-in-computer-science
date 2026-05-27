/**
 *
 * This source code is used under the MIT License from Facebook, Inc. and its affiliates.
 *
 * Welcome to the Capstone Showcase, where we proudly present the innovative projects developed by student groups from Temple University's CIS4398 capstone course. This course allows students to utilize the culmination of all their previous coursework and outside experience to build software as a team. This page highlights the exceptional documentation, presentation, and technical skills demonstrated in these collaborative efforts. Over 17 weeks, students tackle projects in diverse domains, from AI and accessibility to IoT and computer science education tools, using Agile methodologies and tools like Jira and GitHub. Many projects also involve hardware challenges, such as soldering and working with embedded systems. As a writing-intensive course, students thoroughly document their projects using Docusaurus. Explore these achievements and witness the future potential of these emerging professionals.
 */
import type {ReactNode} from 'react';
import React, {useEffect} from 'react';
import {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {resolveLegacyShowcaseRedirect} from '@site/src/data/showcase';

import ShowcaseCards from './_components/ShowcaseCards';
import ShowcaseFilters from './_components/ShowcaseFilters';
import ShowcaseGlossary from './_components/ShowcaseGlossary';
import styles from './styles.module.css';

const SEO_TITLE = translate({
  message: 'Temple University CIS4398 Senior Capstone Projects Showcase',
});
const HERO_TITLE_LEAD = translate({message: 'Senior Capstone'});
const HERO_TITLE_TRAIL = translate({message: 'Projects Showcase'});
const HERO_EYEBROW = translate({message: 'Temple University · CIS4398'});
const HERO_SUBTITLE = translate({
  message:
    'Explore student-built computer science projects in AI, accessibility, robotics, embedded systems, multiplayer gaming, education technology, and software engineering.',
});
const SEO_DESCRIPTION = translate({
  message:
    'Explore Temple University CIS4398 senior capstone projects in AI, accessibility, robotics, embedded systems, gaming, edtech, and software engineering.',
});

function buildAbsoluteUrl(siteUrl: string, baseUrl: string, path: string) {
  return new URL(path.replace(/^\//, ''), `${siteUrl}${baseUrl}`).toString();
}

function buildShareImageUrl(targetUrl: string) {
  return `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
    targetUrl,
  )}/showcase/_764234242`;
}

function ShowcaseHeader() {
  return (
    <section className={`text--center ${styles.heroSection}`}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>{HERO_EYEBROW}</p>
        <h1 className={styles.title}>
          <span className={styles.titleLead}>{HERO_TITLE_LEAD}</span>
          <span className={styles.titleTrail}>
            <span>{HERO_TITLE_TRAIL}</span>
            <span aria-hidden="true" className={styles.titleStar}>
              ⭐️
            </span>
          </span>
        </h1>
        <p className={styles.description}>{HERO_SUBTITLE}</p>
        <div className={styles.heroActions}>
          <Link className={styles.carouselLink} to="/showcase/carousel">
            Event carousel
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Showcase(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const canonicalUrl = buildAbsoluteUrl(
    siteConfig.url,
    siteConfig.baseUrl,
    '/showcase',
  );
  const shareImage = buildShareImageUrl(canonicalUrl);

  useEffect(() => {
    const redirectTarget = resolveLegacyShowcaseRedirect({
      pathname: window.location.pathname,
      hash: window.location.hash,
      search: window.location.search,
    });

    if (redirectTarget) {
      window.location.replace(redirectTarget);
      return undefined;
    }

    function getHighlightTarget(id: string): HTMLElement | null {
      const element = document.getElementById(id);
      if (!element) {
        return null;
      }

      return (
        (element.closest('[data-project-card="true"]') as HTMLElement | null) ||
        element
      );
    }

    function scrollToHash() {
      try {
        const hash = window.location.hash;
        if (!hash) return;
        const id = hash.startsWith('#') ? hash.slice(1) : hash;
        const el = getHighlightTarget(id);
        if (el) {
          // smooth scroll and center the card
          el.scrollIntoView({behavior: 'smooth', block: 'center'});
          // add temporary highlight
          el.classList.add('showcase-highlight');
          window.setTimeout(() => el.classList.remove('showcase-highlight'), 3500);
        }
      } catch (e) {
        // ignore in SSR or restricted environments
        // console.warn('scrollToHash failed', e);
      }
    }

    // Scroll on mount
    scrollToHash();
    // Also scroll when the hash changes
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  // Glossary is rendered eagerly; entries inside the glossary will lazy-load as the user scrolls.

  return (
    <Layout description={SEO_DESCRIPTION}>
      <Head>
        <title>{SEO_TITLE}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={SEO_DESCRIPTION} />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />
        <meta name="twitter:image" content={shareImage} />
      </Head>
      <main className={styles.page}>
        <ShowcaseHeader />
        <ShowcaseFilters />
        <ShowcaseCards />
        <ShowcaseGlossary />
       </main>
     </Layout>
   );
 }
