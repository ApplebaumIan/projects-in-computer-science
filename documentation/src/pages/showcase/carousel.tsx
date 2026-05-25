import React, {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import showcaseProjects, {
  getProjectDetailPath,
  getProjectImage,
  parseYoutubeUrl,
  type Project,
} from '@site/src/data/showcase';

import styles from './carousel.module.css';

const ROTATE_MS = 18000;
const HERO_TITLE = 'Senior Capstone Projects Showcase';
const HERO_SUBTITLE =
  'Explore student-built computer science projects in AI, accessibility, robotics, embedded systems, multiplayer gaming, education technology, and software engineering.';

function buildAbsoluteUrl(siteUrl: string, baseUrl: string, path: string) {
  return new URL(path.replace(/^\//, ''), `${siteUrl}${baseUrl}`).toString();
}

function buildQrCodeUrl(url: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    url,
  )}`;
}

function buildEmbedUrl(project: Project) {
  const {videoId, startTime} = parseYoutubeUrl(project.demo);
  if (!videoId) {
    return null;
  }

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    loop: '1',
    playlist: videoId,
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  if (startTime) {
    params.set('start', startTime);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function getCarouselProjects(projects: Project[]) {
  return projects
    .filter((project) => Boolean(project.demo || getProjectImage(project)))
    .sort((left, right) => (right.semester || '').localeCompare(left.semester || ''));
}

function truncateDescription(description: string, max = 340) {
  if (description.length <= max) {
    return description;
  }

  return `${description.slice(0, max).trimEnd()}...`;
}

export default function ShowcaseCarousel() {
  const {siteConfig} = useDocusaurusContext();
  const projects = useMemo(() => getCarouselProjects(showcaseProjects), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeProject = projects[activeIndex];

  useEffect(() => {
    if (projects.length <= 1 || isPaused) {
      setProgress(0);
      return undefined;
    }

    const startedAt = Date.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(elapsed / ROTATE_MS, 1));
    }, 200);

    const rotateTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
      setProgress(0);
    }, ROTATE_MS);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(rotateTimer);
    };
  }, [activeIndex, isPaused, projects.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!projects.length) {
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current + 1) % projects.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
      } else if (event.key.toLowerCase() === ' ') {
        event.preventDefault();
        setIsPaused((current) => !current);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [projects.length]);

  if (!activeProject) {
    return (
      <>
        <Head>
          <title>Showcase Carousel</title>
        </Head>
        <main className={styles.page}>
          <section className={styles.emptyState}>
            <div className={styles.emptyCard}>
              <h1>No projects are ready for the carousel yet.</h1>
              <p>Add a `demo` video URL or preview image to a showcase project to include it here.</p>
              <Link className={styles.linkButton} to="/showcase">
                Back to Showcase
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  const projectPath = getProjectDetailPath(activeProject);
  const showcaseUrl = buildAbsoluteUrl(siteConfig.url, siteConfig.baseUrl, projectPath);
  const qrCodeUrl = buildQrCodeUrl(showcaseUrl);
  const embedUrl = buildEmbedUrl(activeProject);
  const previewImage = getProjectImage(activeProject);

  return (
    <>
      <Head>
        <title>{`${activeProject.title} | Showcase Carousel`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={styles.page}>
        <section className={styles.carouselShell}>
          <header className={styles.topBar}>
            <div className={styles.brandBlock}>
              <p className={styles.eyebrow}>Temple University · CIS4398</p>
              <h1 className={styles.title}>{HERO_TITLE}</h1>
              <p className={styles.subtitle}>{HERO_SUBTITLE}</p>
            </div>
            <div className={styles.controls}>
              <span className={styles.statusPill}>
                {activeIndex + 1} / {projects.length}
              </span>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() =>
                  setActiveIndex((current) => (current - 1 + projects.length) % projects.length)
                }>
                Previous
              </button>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => setIsPaused((current) => !current)}>
                {isPaused ? 'Resume rotation' : 'Pause rotation'}
              </button>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => setActiveIndex((current) => (current + 1) % projects.length)}>
                Next
              </button>
              <Link className={styles.linkButton} to="/showcase">
                Back to showcase
              </Link>
            </div>
          </header>

          <div className={styles.contentGrid}>
            <section className={styles.videoPanel}>
              {embedUrl ? (
                <iframe
                  key={embedUrl}
                  className={styles.videoFrame}
                  src={embedUrl}
                  title={`${activeProject.title} demo video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className={styles.videoPlaceholder}>
                  {previewImage ? (
                    <img
                      className={styles.placeholderImage}
                      src={previewImage}
                      alt={`${activeProject.title} preview`}
                    />
                  ) : null}
                  <div className={styles.placeholderOverlay}>
                    <p className={styles.placeholderNote}>
                      Demo video embed not available for this project yet. The QR code still opens the showcase page so visitors can explore the project details.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <aside className={styles.infoPanel}>
              <div className={styles.projectHero}>
                <div className={styles.projectMeta}>
                  <p className={styles.projectSemester}>
                    {activeProject.semester || 'Showcase project'}
                  </p>
                  <h2 className={styles.projectTitle}>{activeProject.title}</h2>
                  <p className={styles.projectDescription}>
                    {truncateDescription(activeProject.description)}
                  </p>
                </div>

                <div className={styles.qrSection}>
                  <img
                    className={styles.qrImage}
                    src={qrCodeUrl}
                    alt={`QR code for ${activeProject.title} showcase page`}
                  />
                  <p className={styles.qrCaption}>
                    Scan to open this project&apos;s showcase page on a phone or tablet.
                  </p>
                  <div className={styles.linkList}>
                    <a
                      className={styles.linkButton}
                      href={showcaseUrl}
                      target="_blank"
                      rel="noreferrer">
                      Open showcase page
                    </a>
                    {activeProject.website ? (
                      <a
                        className={styles.linkButton}
                        href={activeProject.website}
                        target="_blank"
                        rel="noreferrer">
                        Open live project
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              {previewImage ? (
                <div className={styles.thumbCard}>
                  <p className={styles.thumbLabel}>Docusaurus showcase thumbnail</p>
                  <img
                    className={styles.thumbImage}
                    src={previewImage}
                    alt={`${activeProject.title} showcase thumbnail`}
                  />
                </div>
              ) : (
                <div className={styles.thumbCard}>
                  <p className={styles.thumbLabel}>Showcase page</p>
                  <p className={styles.qrCaption}>This project does not have a generated showcase thumbnail yet.</p>
                </div>
              )}

              <div
                className={styles.progressRail}
                style={{['--progress-width' as string]: `${progress * 100}%`}}>
                <div className={styles.progressBar} />
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
