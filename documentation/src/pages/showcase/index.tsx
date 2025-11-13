/**
 *
 * This source code is used under the MIT License from Facebook, Inc. and its affiliates.
 *
 * Welcome to the Capstone Showcase, where we proudly present the innovative projects developed by student groups from Temple University's CIS4398 capstone course. This course allows students to utilize the culmination of all their previous coursework and outside experience to build software as a team. This page highlights the exceptional documentation, presentation, and technical skills demonstrated in these collaborative efforts. Over 17 weeks, students tackle projects in diverse domains, from AI and accessibility to IoT and computer science education tools, using Agile methodologies and tools like Jira and GitHub. Many projects also involve hardware challenges, such as soldering and working with embedded systems. As a writing-intensive course, students thoroughly document their projects using Docusaurus. Explore these achievements and witness the future potential of these emerging professionals.
 */
import React, {ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';

import Layout from '@theme/Layout';

import ShowcaseSearchBar from '@site/src/pages/showcase/_components/ShowcaseSearchBar';
import ShowcaseCards from './_components/ShowcaseCards';
import ShowcaseFilters from './_components/ShowcaseFilters';
import styles from '../../pages/index.module.css';
import clsx from "clsx";
import  {HomepageHeader} from "../../pages/index.js";
const TITLE = translate({message: 'Capstone Showcase ⭐️'});
const DESCRIPTION = translate({
    /* I need a short one line message to introduce the showcase of capstone projects */
  message: 'Discover the innovative projects developed by student groups from Temple University\'s CIS4398 capstone course, showcasing their technical skills and collaborative efforts across diverse domains.',
});
const SUBMIT_URL = 'https://github.com/facebook/docusaurus/discussions/7826';

function ShowcaseHeader() {
  return (
      <>
     {/*<section className="margin-top--lg margin-bottom--lg text--center">*/}
      <HomepageHeader >
          <h1 className={clsx("hero__title", styles.showcaseTitle)}>
              {TITLE}
            </h1>
          <p className={styles.hero__subtitle} style={{marginBottom:100}}>
              {DESCRIPTION}
          </p>
          {/*<center style={{marginLeft: 300, marginRight: 300}}>{DESCRIPTION}</center>*/}

      </HomepageHeader>
    </>
    /* </section>*/
  );
}

export default function Showcase(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
        <ShowcaseHeader />
        <main className="margin-vert--lg">
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
