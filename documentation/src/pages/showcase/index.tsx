/**
 *
 * This source code is used under the MIT License from Facebook, Inc. and its affiliates.
 *
 * Welcome to the Capstone Showcase, where we proudly present the innovative projects developed by student groups from Temple University's CIS4398 capstone course. This course allows students to utilize the culmination of all their previous coursework and outside experience to build software as a team. This page highlights the exceptional documentation, presentation, and technical skills demonstrated in these collaborative efforts. Over 17 weeks, students tackle projects in diverse domains, from AI and accessibility to IoT and computer science education tools, using Agile methodologies and tools like Jira and GitHub. Many projects also involve hardware challenges, such as soldering and working with embedded systems. As a writing-intensive course, students thoroughly document their projects using Docusaurus. Explore these achievements and witness the future potential of these emerging professionals.
 */
import type {ReactNode} from 'react';
import React, {useEffect} from 'react';
import Translate, {translate} from '@docusaurus/Translate';

import Layout from '@theme/Layout';

import ShowcaseSearchBar from '@site/src/pages/showcase/_components/ShowcaseSearchBar';
import ShowcaseCards from './_components/ShowcaseCards';
import ShowcaseFilters from './_components/ShowcaseFilters';

const TITLE = translate({message: 'Capstone Showcase ⭐️'});
const DESCRIPTION = translate({
    /* I need a short one line message to introduce the showcase of capstone projects */
  message: 'Discover the innovative projects developed by student groups from Temple University\'s CIS4398 capstone course, showcasing their technical skills and collaborative efforts across diverse domains.',
});
const SUBMIT_URL = 'https://github.com/facebook/docusaurus/discussions/7826';

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p style={{maxWidth: 960, margin: '0 auto 2rem'}}>{DESCRIPTION}</p>
    </section>
  );
}

export default function Showcase(): ReactNode {
  useEffect(() => {
    function scrollToHash() {
      try {
        const hash = window.location.hash;
        if (!hash) return;
        const id = hash.startsWith('#') ? hash.slice(1) : hash;
        const el = document.getElementById(id);
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

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseFilters />
        <div
          style={{display: 'flex', marginLeft: 'auto'}}
          className="container">
          <ShowcaseSearchBar />
        </div>
        <ShowcaseCards />
      </main>
    </Layout>
  );
}
