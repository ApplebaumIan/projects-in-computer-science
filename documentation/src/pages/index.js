import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeVideoDescription from "../components/YouTubeVideoDescription";
import Instructor from "../components/Instructor/Instructor";
import ShowcaseCard from "@site/src/pages/showcase/_components/ShowcaseCard";
import {demoLineupProjects, demoSections} from "@site/src/data/demoLineup";
const buttons = [
    { to: "#office-hours", label: "Student Office Hours ️👨‍🏫" },
    { to: "/syllabus/course-overview", label: "Course Syllabus 📋" },
    { to: "/syllabus/schedule", label: "Course Schedule 📆" },
];
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
          {buttons.map((btn) => (
              <Link key={btn.to} className="button button--secondary button--lg margin--md" to={btn.to}>
                  {btn.label}
              </Link>
          ))}
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
  // Sort sections by id for stable ordering like '001', '002', ...
  const sections = Object.entries(demoSections).sort(([a],[b]) => a.localeCompare(b, undefined, {numeric: true}));

  return (
      <section style={{ marginBottom: '6rem'}}>
          <h1 style={{ marginBottom: '2rem'}}>Watch Live Stream <span className={styles.recordingDot} aria-label="Recording live" role="status" /></h1>
    <Tabs queryString="section" className={clsx("unique-tabs", styles.compactTabs)}>
      {sections.map(([id, section]) => {
        const sectionProjects = demoLineupProjects.filter(p => section.projectSlugs.includes(p.slug));
        return (
          <TabItem
            key={id}
            value={id}
            label={<>{section.name}<br/>{section.time}<br/>📍{section.location}</>}
          >
            <div className={styles.demoSectionGrid}>
              <div className={styles.videoArea}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={`https://www.youtube.com/embed/${section.youtubeId}`}
                    title={`${section.name} Live Stream`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className={styles.descArea}>
                  <div style={{flexWrap: 'wrap', display: 'flex', gap: '12px', marginBottom: '12px', justifyContent: 'center'}}>
                  <Link className="button button--primary button--lg margin--md" to='#presenting-projects'>
                      Checkout the Projects 🚀
                  </Link>
                  </div>
                <YouTubeVideoDescription videoId={section.youtubeId} />

              </div>

              <div className={styles.projectsArea}>
                <h3 id={'presenting-projects'} style={{marginTop:0}}>Presenting Projects</h3>
                <ul className={clsx('clean-list', styles.projectsGrid)}>
                  {sectionProjects.map(project => (
                    <ShowcaseCard key={project.slug} user={project} contributorsColumns={6} />
                  ))}
                </ul>
              </div>
            </div>
          </TabItem>
        );
      })}
    </Tabs>

          <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <p style={{marginBottom: '1rem'}}>Still waiting? Checkout previous semesters' for more amazing projects!</p>
              <Link className="button button--secondary button--lg" to='/showcase'>
              Capstone Showcase ⭐️
              </Link>
          </div>

      </section>
  );
}

export default function Home() {
    return (
        <Layout
            title={`Home`}
            description="Professor Applebaum's Capstone Course Homepage.">
            <HomepageHeader/>
            <main>
                <div style={{zIndex: 100000, marginLeft: "5%", marginRight: "5%"}}>
                    <DemoLineUp/>
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
