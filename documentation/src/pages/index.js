import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ProjectReadme from "../components/ReademeMD";
import styles from './index.module.css';
//import Syllabus from '../components/Syllabus';
import SyllabusPage from './_syllabus-page.mdx'
import MDXContent from '@theme/MDXContent';
import Figure from "../components/Figure";
import DontPanic from "../../static/img/dont-panic.svg"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeVideoDescription from "../components/YouTubeVideoDescription";
import BrowserOnly from "@docusaurus/BrowserOnly";
import docusaurusConfig from "../../.docusaurus/docusaurus.config.mjs";

function isTimeBetween(startDate, endDate) {
    var currentDate = new Date();
    if (currentDate >= startDate && currentDate <= endDate) {
        return true;
    } else {
        return false;
    }
}

export function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container" style={{zIndex:100}}>
          <div className={"row"}>
              <div className={"col"}>
                  <h1 className="hero__title">{siteConfig.customFields.course_number} <br/>
                      {siteConfig.title}
                  </h1>
                  <p className="hero__subtitle">{siteConfig.customFields.semester} {siteConfig.tagline}</p>
                  <div className={"col"}>
                      {/* TODO: Change me to your project's tutorial*/ }
                      <Link
                          className="button button--secondary button--lg margin--md"
                          to="#office-hours-professor-applebaum">
                          Student Office Hours ️👨‍🏫
                      </Link>
                      <Link
                          className="button button--secondary button--lg margin--md"
                          to="#class-discord">
                          Class Discord Server 💬
                      </Link>
                      <Link
                          className="button button--secondary button--lg margin--md"
                          to="#course-schedule">
                          Course Schedule 📆
                      </Link>
                      <Link
                          className="button button--secondary button--lg margin--md"
                          to="/tutorial/intro">
                          Docusaurus Tutorial 🦖
                      </Link>
                  </div>

              </div>

              {/*{docusaurusConfig.customFields.is_pdf ? <></> : <WatchLiveDemo/>}*/}


        </div>
      </div>
        {/*<BrowserOnly  fallback={<div>Loading...</div>} >*/}
        {/*    {() => {*/}
        {/*        const AnimatedBackground =*/}
        {/*            require('../components/AnimatedBackground/index').AnimatedBackground;*/}
        {/*        return <AnimatedBackground/>;*/}
        {/*    }}*/}
        {/*</BrowserOnly>*/}

    </header>
  );
}

function WatchLiveDemo() {
    // Section 002 should appear first
    var section002Start = new Date("2023-04-29T01:00:00");
    var section002End = new Date("2023-05-01T15:20:00");

    // refreshing the page should then show section 003
    var section003Start = new Date("2023-05-01T15:20:00");
    var section003End = new Date("2023-05-01T16:50:00");

    return <div className={"live-demo card container shadow--tl margin--lg"}>
        <div className={"card__header row"}>
            <div className={"col col--9"}>
                <h2>Watch Live 🔴</h2>
                <h3>December 11th 10:30am to 5:00pm EST on YouTube</h3>
                <p>64 Students, 9 projects, come see Temple University students present their 17 weeks worth of work live on YouTube. This semester projects range from embedded systems projects, augmented reality, unique machine learning experiences to help improve an underserved community's daily life and so much more.</p>

            </div>
            <div className={"col col--3"}>
                <DontPanic style={{width: "100%"}}
                           alt={"The words \"Don\'t panic\", written in large red friendly letters."}/>
            </div>
        </div>
        <div className={"card__body"}>
            <Tabs queryString="section">
                <TabItem value="701" label={<>Section 701<br/>10:30-11:50am EST</>}>
                    <Figure caption={"Final Demos Fall Semester 2023 Live Stream"} subcaption={"Section 701"}>
                        <iframe width="100%" height="615" src="https://www.youtube.com/embed/Wge6Wd8ctRI?si=uA_0c1Y_gDTvJ-jm"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"Wge6Wd8ctRI"}/>
                        </details>
                    </div>
                </TabItem>
                <TabItem value="002" label={<>Section 002<br/>2:00pm to 3:20pm EST</>} default={isTimeBetween(section002Start,section002End)}>
                    <Figure caption={"Final Demos Fall Semester 2023 Live Stream"} subcaption={"Section 002"}>
                    <iframe width="100%" height="615" src="https://www.youtube.com/embed/xYrKWJfFlUc?si=9Aw-8zQbGpXQobEm"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"xYrKWJfFlUc"}/>
                        </details>
                    </div>
                </TabItem>
                <TabItem value="003" label={<>Section 003<br/>3:40pm to 5:00pm EST</>} default={isTimeBetween(section003Start,section003End)}>
                    <Figure caption={"Final Demos Fall Semester 2023 Live Stream"} subcaption={"Section 003"}>
                        <iframe width="100%" height="615" src="https://www.youtube.com/embed/XxRJPMJZ6Fk?si=AuK6OV1CxdGTYNv3"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"XxRJPMJZ6Fk"}/>
                        </details>
                    </div>
                </TabItem>
            </Tabs>
        </div>
    </div>;
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
        title={`Syllabus`}
        description="Professor Applebaum's Capstone Course Syllabus.">
        <HomepageHeader/>
        <main>
            <div style={{zIndex:100000}}>
                <MDXContent>
                    <SyllabusPage/>
                </MDXContent>
            </div>
        </main>
    </Layout>
  );
}
