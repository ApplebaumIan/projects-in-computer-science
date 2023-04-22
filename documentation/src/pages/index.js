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
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
          <div className={"row"}>
              <div className={"col"}>
                  <h1 className="hero__title">{siteConfig.title}</h1>
                  <p className="hero__subtitle">{siteConfig.tagline}</p>
              </div>

              <WatchLiveDemo/>
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
      </div>
    </header>
  );
}

function WatchLiveDemo() {
    return <div className={"live-demo card container shadow--tl margin--lg"}>
        <div className={"card__header row"}>
            <div className={"col col--9"}>
                <h2>Watch Live 🔴</h2>
                <h3>April 27th 3:30-4:50pm and May 1st 2:00-3:30pm EST on YouTube</h3>
                <p>48 Students, 7 projects, come see Temple University students present their 17 weeks worth of work live on YouTube. Projects ranging from unique education technologies to machine learning applications that can detect parking spots and predict stocks, this semester's teams have quite a lot to share.</p>

            </div>
            <div className={"col col--3"}>
                <DontPanic style={{width: "100%"}}
                           alt={"The words \"Don\'t panic\", written in large red friendly letters."}/>
            </div>
        </div>
        <div className={"card__body"}>
            <Tabs>
                <TabItem value="704" label={<>Section 704<br/>April 27th 3:30-4:50pm EST</>} default>
                    <Figure caption={"Final Demos Spring Semester 2023 Live Stream"} subcaption={"Section 704"}>
                        <iframe width="100%" height="615" src="https://www.youtube.com/embed/spUYv7YRjcU"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"spUYv7YRjcU"}/>
                        </details>
                    </div>
                </TabItem>
                <TabItem value="002" label={<>Section 002<br/>May 1st 2:00pm to 3:30pm</>}>
                    <Figure caption={"Final Demos Spring Semester 2023 Live Stream"} subcaption={"Section 002"}>
                    <iframe width="100%" height="615" src="https://www.youtube.com/embed/HTpbSxVOIL0"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"HTpbSxVOIL0"}/>
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
        description="Professor Applebaum's Capstone Projects in Computer Science Course Syllabus.">
        <HomepageHeader/>
        <div>
            <Figure caption={"Class Moto:"} subcaption={"Don't Panic, but expect the unexpected."}>
                <DontPanic style={{width:"50%"}} alt={"The words \"Don\'t panic\", written in large red friendly letters."}/>
            </Figure>
        </div>
        <main>
            <MDXContent>
                <div style={{margin: 50}}>
                    <SyllabusPage/>
                </div>
            </MDXContent>
        </main>
    </Layout>
  );
}
