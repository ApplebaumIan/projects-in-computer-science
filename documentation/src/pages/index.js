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
                        <div className={"col button_group"}>
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
            <div className='air air1'/>
            <div className='air air2'/>
            <div className='air air3'/>
            <div className='air air4'/>
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
                <h3>April 29th 9:30am to 5:00pm EST on YouTube</h3>
                <p>We have a lot to share this semester. 6 ambitious projects dealing with AI, Accessibility, Computer Vision, IoT, Embedded Systems, Gaming, and Computer Science Education. <b>Come see what Temple University's class of 2024 has to offer.</b></p>

            </div>
            <div className={"col col--3"}>
                <DontPanic style={{width: "100%"}}
                           alt={"The words \"Don\'t panic\", written in large red friendly letters."}/>
            </div>
        </div>
        <div className={"card__body"}>
            <Tabs queryString="section">
                <TabItem value="001" label={<>Section 001<br/>9:30-10:50am EST<br/>📍SERC 214</>}>
                    <Figure caption={"Final Demos Spring Semester 2024 Live Stream"} subcaption={"Section 001"}>
                        <iframe width="100%" height="615" src="https://www.youtube.com/embed/7Hc27xvGuj4"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"7Hc27xvGuj4"}/>
                        </details>
                    </div>
                </TabItem>
                <TabItem value="002" label={<>Section 002<br/>12:30pm to 1:50pm EST<br/>📍SERC 306</>} default={isTimeBetween(section002Start,section002End)}>
                    <Figure caption={"Final Demos Spring Semester 2024 Live Stream"} subcaption={"Section 002"}>
                        <iframe width="100%" height="615" src="https://www.youtube.com/embed/w5BaWx_9U6U"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"w5BaWx_9U6U"}/>
                        </details>
                    </div>
                </TabItem>
                <TabItem value="003" label={<>Section 003<br/>3:30pm to 4:00pm EST<br/>📍SERC 306</>} default={isTimeBetween(section003Start,section003End)}>
                    <Figure caption={"Final Demos Spring Semester 2024 Live Stream"} subcaption={"Section 003"}>
                        <iframe width="100%" height="615" src="https://www.youtube.com/embed/Y7IkoT6fJuc"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </Figure>
                    <div className={"col"}>
                        <details>
                            <summary className={"button button--outline button--primary margin-bottom--lg"}>
                                Click Here For the Demo Lineup!
                            </summary>
                            <YouTubeVideoDescription videoId={"Y7IkoT6fJuc"}/>
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
