import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Figure from "../components/Figure";
import DontPanic from "../../static/img/dont-panic.svg"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeVideoDescription from "../components/YouTubeVideoDescription";
import Instructor from "../components/Instructor/Instructor";
import TeachingAssistants from "../components/TeachingAssistants";
import OfficeHours from "../components/OfficeHours/OfficeHours";
import ShowcaseCard from "@site/src/pages/showcase/_components/ShowcaseCard";
import {demoLineupProjects, demoSections} from "@site/src/data/demoLineup";

function HeaderBody({siteConfig}) {
  return (
    <>
      <h1 className={styles.hero__title}>
        {siteConfig.customFields.course_number} <br />
        {siteConfig.title}
      </h1>
      <p className={styles.hero__subtitle}>
        {siteConfig.customFields.semester} {siteConfig.tagline}
      </p>
      <div className={"col button_group"}>
        <Link className="button button--secondary button--lg margin--md" to="#office-hours">
          Student Office Hours ️👨‍🏫
        </Link>
        <Link className="button button--secondary button--lg margin--md" to="/syllabus/course-overview">
          Course Syllabus 📋
        </Link>
        <Link className="button button--secondary button--lg margin--md" to="/syllabus/schedule">
          Course Schedule 📆
        </Link>
      </div>
    </>
  );
}

export function HomepageHeader({children}) {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container" style={{zIndex: 100}}>
        <div className={"row"}>
          <div className={"col"}>
            {children ? children : <HeaderBody siteConfig={siteConfig} />}
          </div>
        </div>
      </div>
      <div className='air air1' />
      <div className='air air2' />
      <div className='air air3' />
      <div className='air air4' />
    </header>
  );
}

function DemoLineUp() {
  const section001 = demoSections['001'];
  const section002 = demoSections['002'];

  const section001Projects = demoLineupProjects.filter((project) =>
    section001.projectSlugs.includes(project.slug)
  );

  const section002Projects = demoLineupProjects.filter((project) =>
    section002.projectSlugs.includes(project.slug)
  );

  return (
    <Tabs queryString="section" className={"unique-tabs"}>
      <TabItem
        value="001"
        label={
          <>
            {section001.name}
            <br />
            {section001.time}
            <br />
            📍{section001.location}
          </>
        }
      >
          <div style={{marginTop: '2rem'}}>
              <h3>Presenting Projects</h3>
              <ul
                  className={clsx('clean-list')}
                  style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: '1.5rem',
                      listStyle: 'none',
                      padding: 0,
                  }}
              >
                  {section001Projects.map((project) => (
                      <li key={project.slug}>
                          <ShowcaseCard user={project} />
                      </li>
                  ))}
              </ul>
          </div>
        <YouTubeVideoDescription videoId={section001.youtubeId} />
      </TabItem>

      <TabItem
        value="002"
        label={
          <>
            {section002.name}
            <br />
            {section002.time}
            <br />
            📍{section002.location}
          </>
        }
      >
          <div style={{marginTop: '2rem'}}>
              <h3>Presenting Projects</h3>
              <ul
                  className={clsx('clean-list')}
                  style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: '1.5rem',
                      listStyle: 'none',
                      padding: 0,
                  }}
              >
                  {section002Projects.map((project) => (
                      <li key={project.slug}>
                          <ShowcaseCard user={project} />
                      </li>
                  ))}
              </ul>
          </div>
          <YouTubeVideoDescription videoId={section002.youtubeId} />
      </TabItem>
    </Tabs>
  );
}

function WatchLiveDemo() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={"live-demo card container shadow--tl"}>
      <div className={"card__header row"}>
        <div className={"col"}>
          <h1 className={styles.hero__title}>
            {siteConfig.customFields.course_number} <br />
            {siteConfig.title}
          </h1>
          <p style={{margin: 0, padding: 0}}>
            {siteConfig.customFields.semester} {siteConfig.tagline}
          </p>
        </div>
        <div className={"col col--2"}>
          <DontPanic style={{width: '100%'}} alt={"The words \"Don't panic\", written in large red friendly letters."} />
        </div>
      </div>
      <div className={"card__body"}>
        <DemoLineUp />
      </div>
    </div>
  );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Home`}
            description="Professor Applebaum's Capstone Course Homepage.">
            <HomepageHeader>
                {/*<WatchLiveDemo/>*/}
            </HomepageHeader>
            <main>
                <div style={{zIndex: 100000, marginLeft: "5%", marginRight: "5%"}}>
                    {/*<div className={"mobile-live-demo"}>*/}

                        <DemoLineUp/>
                    {/*</div>*/}
                        <Instructor/>

                </div>
                <nav className="pagination-nav docusaurus-mt-lg" aria-label="Docs pages" style={{justifyContent: 'center', margin: '2rem 0'}}>
                    <Link className="pagination-nav__link pagination-nav__link--next" to="/syllabus/course-overview">
                        <div className="pagination-nav__sublabel">Continue Reading</div>
                        <div className="pagination-nav__label">Course Overview</div>
                    </Link>
                </nav>
            </main>
        </Layout>
    );
}






