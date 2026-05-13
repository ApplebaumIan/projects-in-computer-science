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
import Discord from "../../static/img/discord_logo.svg"
import Figure from "../components/Figure";
import Admonition from "@theme/Admonition";

function SummerSun() {
  return (
    <div className={styles.summerSun} aria-hidden="true">
      <svg viewBox="0 0 220 220" className={styles.summerSunSvg}>
        <g className={styles.summerSunOrbit}>
          <circle cx="110" cy="110" r="64" className={styles.summerSunRing} />
          {[...Array(12)].map((_, index) => {
            const angle = (index * Math.PI) / 6;
            const x1 = 110 + Math.cos(angle) * 82;
            const y1 = 110 + Math.sin(angle) * 82;
            const x2 = 110 + Math.cos(angle) * 102;
            const y2 = 110 + Math.sin(angle) * 102;
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={styles.summerSunRay}
              />
            );
          })}
        </g>
        <circle cx="110" cy="110" r="48" className={styles.summerSunCore} />
        <g className={styles.summerSunShades}>
          <rect x="76" y="84" width="28" height="20" rx="8" className={styles.summerSunShadeLens} />
          <rect x="116" y="84" width="28" height="20" rx="8" className={styles.summerSunShadeLens} />
          <rect x="104" y="91" width="12" height="4" rx="2" className={styles.summerSunShadeBridge} />
        </g>
        <path d="M88 126 Q110 144 132 126" className={styles.summerSunSmile} />
      </svg>
    </div>
  );
}

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
  const isSummer = siteConfig.customFields.course_format === 'summer';
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      {isSummer && <SummerSun />}
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
                <h3 id={'presenting-projects'} style={{marginTop:0, marginBottom:'3rem' }}>Presenting Projects</h3>
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
                    {/*<DemoLineUp/>*/}
                    <Instructor/>
                    <section className={styles.discordSection} aria-labelledby="discord-community">
                        <div className={styles.discordHero}>
                            <div className={styles.discordCopy}>
                                <div className={styles.discordHeading}>
                                    <div className={styles.discordLogoWrap} aria-hidden="true">
                                        <Discord className={styles.discordLogo} />
                                    </div>
                                    <h2 id="discord-community">Discord Community</h2>
                                </div>
                                <p>
                                    In this class, Discord will be the host for team communication as well as communication with
                                    your instructors and peers.
                                </p>
                                <p>
                                    You are free to conduct team meetings, have discussions about your projects, get advice, or
                                    talk with your instructors using this platform. In addition, you may talk about your projects
                                    and assignments with other students in all the sections of the CIS 4398 Projects course.
                                </p>
                            </div>
                        </div>

                        <Admonition type={"important"}>
                            Please make sure that you change your nickname to your full name!
                        </Admonition>

                        <div className={styles.discordDetails}>
                            <div className={styles.discordQrCard}>
                                <Figure
                                    src={"https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://discord.com/invite/97hbYEH5"}
                                    caption={"Scan QR Code above to join Discord Server"}
                                />
                            </div>
                            <div className={styles.discordWidgetCard}>
                                <iframe
                                    className={styles.discordWidget}
                                    src="https://discord.com/widget?id=687852908754239555&theme=dark"
                                    title="Discord server widget"
                                    allowtransparency="true"
                                    frameBorder="0"
                                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                                />
                            </div>
                        </div>
                    </section>

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
