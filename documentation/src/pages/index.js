import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Figure from "../components/Figure";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeVideoDescription from "../components/YouTubeVideoDescription";
import * as PropTypes from "prop-types";
import Instructor from "../components/Instructor/Instructor";

function isTimeBetween(startDate, endDate) {
    const currentDate = new Date();
    return currentDate >= startDate && currentDate <= endDate;
}

export function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container" style={{zIndex:100}}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1 className={styles.hero__title}>{siteConfig.customFields.course_number} <br/>
                            {siteConfig.title}
                        </h1>
                        <p className={styles.hero__subtitle}>{siteConfig.customFields.semester} {siteConfig.tagline}</p>
                        <div className={"col button_group"}>
                            {/* TODO: Change me to your project's tutorial*/ }
                            <Link
                                className="button button--secondary button--lg margin--md"
                                to="#office-hours">
                                Student Office Hours ️👨‍🏫
                            </Link>
                            <Link
                                className="button button--secondary button--lg margin--md"
                                to="/syllabus/course-overview">
                                Course Syllabus 📋
                            </Link>
                            <Link
                                className="button button--secondary button--lg margin--md"
                                to="/syllabus/schedule">
                                Course Schedule 📆
                            </Link>
                            {/*<Link*/}
                            {/*    className="button button--secondary button--lg margin--md"*/}
                            {/*    to="https://applebaumian.github.io/tu-cis-4398-docs-template/tutorial/Intro">*/}
                            {/*    Docusaurus Tutorial 🦖*/}
                            {/*</Link>*/}
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

function DemoLineUp(props) {
    return <Tabs queryString="section" className={"unique-tabs"}>
        <TabItem value="001" label={<>Section 001<br/>9:30-10:50am EST<br/>📍SERC 306</>}>
            <Figure caption={"Final Demos Spring Semester 2025 Live Stream"} subcaption={"Section 001"}>
                <iframe className={"youtube-player"}
                        src="https://www.youtube.com/embed/y990YPLQf2Q?si=rvgBMORM2CBJw9BC"
                        title="YouTube video player" style={{border: 0}}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Figure>
            <div className={"col"}>
                <details>
                    <summary className={"button button--outline button--primary margin-bottom--lg justify-center"}>
                        Click Here For the Demo Lineup!
                    </summary>
                    <YouTubeVideoDescription videoId={"y990YPLQf2Q"}/>
                </details>
            </div>
        </TabItem>
        <TabItem value="002" label={<>Section 002<br/>12:30pm to 1:50pm EST<br/>📍SERC 306</>}
                 default={isTimeBetween(props.startDate, props.endDate)}>
            <Figure caption={"Final Demos Spring Semester 2025 Live Stream"} subcaption={"Section 002"}>
                <iframe className={"youtube-player"}
                        src="https://www.youtube.com/embed/BDUngO0hlBk?si=v6yDyYEZCGdRAgOr"
                        title="YouTube video player" style={{border: 0}}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Figure>
            <div className={"col"}>
                <details>
                    <summary className={"button button--outline button--primary margin-bottom--lg"}>
                        Click Here For the Demo Lineup!
                    </summary>
                    <YouTubeVideoDescription videoId={"BDUngO0hlBk"}/>
                </details>
            </div>
        </TabItem>
        <TabItem value="003" label={<>Section 003<br/>3:30pm to 4:50pm EST<br/>📍SERC 306</>}
                 default={isTimeBetween(props.startDate, props.endDate)}>
            <Figure caption={"Final Demos Spring Semester 2025 Live Stream"} subcaption={"Section 003"}>
                <iframe className={"youtube-player"}
                        src="https://www.youtube.com/embed/j1K0Ypl_iDk?si=OGWRYMr5kdTf5Nq5"
                        title="YouTube video player" style={{border: 0}}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Figure>
            <div className={"col"}>
                <details>
                    <summary className={"button button--outline button--primary margin-bottom--lg"}>
                        Click Here For the Demo Lineup!
                    </summary>
                    <YouTubeVideoDescription videoId={"j1K0Ypl_iDk"}/>
                </details>
            </div>
        </TabItem>
    </Tabs>;
}

DemoLineUp.propTypes = {
    startDate: PropTypes.any,
    endDate: PropTypes.any
};

export default function Home() {
    return (
        <Layout
            title={`Home`}
            description="Professor Applebaum's Capstone Course Homepage.">
            <HomepageHeader/>
            <main>
                <div style={{zIndex: 100000, marginLeft: "5%", marginRight: "5%"}}>
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
