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

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
            {/* TODO: Change me to your project's tutorial*/ }
            <Link
                className="button button--secondary button--lg"
                to="#office-hours-professor-applebaum-via-zoom-meeting">
                Student Office Hours ️👨‍🏫
            </Link>
            <Link
                className="button button--secondary button--lg"
                to="#class-discord">
                Class Discord Server 💬
            </Link>
            <Link
                className="button button--secondary button--lg"
                to="#course-schedule">
                Course Schedule 📆
            </Link>
          <Link
            className="button button--secondary button--lg"
            to="/tutorial/intro">
            Docusaurus Tutorial - 5min 🦖
          </Link>

        </div>
      </div>
    </header>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
        title={`Syllabus`}
        description="Professor Applebaum's Capstone Projects in Computer Science Course Syllabus.">
        <HomepageHeader/>
        {/*<DontPanic/>*/}
        <div>
            <Figure caption={"Class Moto:"} subcaption={"Don't Panic, but expect the unexpected."}>
                <DontPanic style={{width:"50%"}} alt={"The words \"Don\'t panic\", written in large red friendly letters."}/>
            </Figure>
        </div>

        <main>
          <MDXContent>
          <div style={{margin:50}}>
            <SyllabusPage/>
            </div>
          </MDXContent>
        </main>
    </Layout>
  );
}
