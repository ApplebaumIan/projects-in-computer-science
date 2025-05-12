import React, {useEffect} from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
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
import * as PropTypes from "prop-types";
import Instructor from "../components/Instructor/Instructor";
import TeachingAssistants from "../components/TeachingAssistants";
import OfficeHours from "../components/OfficeHours/OfficeHours";
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
                                to="#week-by-week-schedule">
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

function DemoLineUp(props) {
    return <Tabs queryString="section" className={"unique-tabs"}>
        <TabItem value="001" label={<>Section 001<br/>9:30-10:50am EST<br/>📍SERC 306</>}>
            <Figure caption={"Final Demos Spring Semester 2025 Live Stream"} subcaption={"Section 001"}>
                <iframe className={"youtube-player"}
                        src="https://www.youtube.com/embed/y990YPLQf2Q?si=rvgBMORM2CBJw9BC"
                        title="YouTube video player" frameBorder="0"
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
                        title="YouTube video player" frameBorder="0"
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
                        title="YouTube video player" frameBorder="0"
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

function WatchLiveDemo() {
    const {siteConfig} = useDocusaurusContext();

    // Section 002 should appear first
    var section002Start = new Date("2023-04-29T01:00:00");
    var section002End = new Date("2023-05-01T15:20:00");

    // refreshing the page should then show section 003
    var section003Start = new Date("2023-05-01T15:20:00");
    var section003End = new Date("2023-05-01T16:50:00");

    return <div className={"live-demo card container shadow--tl"}>
        <div className={"card__header row"}>
            <div className={"col"}>
                <h1 className={styles.hero__title}>{siteConfig.customFields.course_number} <br/>
                    {siteConfig.title}
                </h1>
                <p style={{margin:"0", padding:0}}>{siteConfig.customFields.semester} {siteConfig.tagline}</p>
                <div className={"col col--9"}>
                    {/*<h2>Watch Live 🔴</h2>*/}
                    {/*<h3>December 9th 9:30am to 3:20pm EST on YouTube</h3>*/}
                </div>

            </div>
            <div className={"col col--2"}>
                <DontPanic style={{width: "100%"}}
                           alt={"The words \"Don\'t panic\", written in large red friendly letters."}/>
            </div>
        </div>
        <div className={"card__body"}>
            <DemoLineUp startDate={section002Start} endDate={section002End}/>
        </div>
    </div>;
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Layout
                title={`Syllabus`}
                description="Professor Applebaum's Capstone Course Syllabus.">
                <HomepageHeader/>
                <main>
                    <div style={{zIndex: 100000}}>
                        <MDXContent>
                            {/*<div className={"mobile-live-demo"}>*/}
                            {/*    <h2>Watch Live 🔴</h2>*/}
                            {/*    <h3>December 9th 9:30am to 3:20pm EST on YouTube</h3>*/}
                            {/*    <DemoLineUp/>*/}
                            {/*</div>*/}
                            <Instructor/>
                            <OfficeHours/>

                            {/*<TeachingAssistants/>*/}
                            <SyllabusPage/>
                        </MDXContent>
                    </div>
                </main>
            </Layout>
        </LocalizationProvider>
    );
}
