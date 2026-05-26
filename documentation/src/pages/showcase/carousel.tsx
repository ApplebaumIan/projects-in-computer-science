import React, {useEffect, useId, useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import showcaseProjects, {
  getProjectDetailPath,
  getProjectImage,
  parseYoutubeUrl,
  type Project,
} from '@site/src/data/showcase';
import {getGlossaryTagMetadata} from '@site/src/data/showcaseGlossary';
import projectPageStyles from '@site/src/components/ShowcaseProjectPage/styles.module.css';

import styles from './carousel.module.css';

const ROTATE_MS = 18000;
const HERO_TITLE = 'Senior Capstone Projects Showcase';
const MAX_VISIBLE_TAGS = 8;

function TagChip({tag}: {tag: string}) {
  const glossary = getGlossaryTagMetadata(tag);
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  return (
    <li
      className={clsx(
        projectPageStyles.tagItem,
        isExpanded && projectPageStyles.tagItemExpanded,
      )}>
      <button
        type="button"
        className={projectPageStyles.tag}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={() => setIsExpanded((current) => !current)}>
        <span
          className={projectPageStyles.tagDot}
          style={{backgroundColor: glossary.color}}
        />
        <span>{glossary.label}</span>
      </button>
      <div
        id={detailsId}
        className={projectPageStyles.tagDetails}
        aria-hidden={!isExpanded}>
        <div className={projectPageStyles.tagDetailsInner}>
          <div className={projectPageStyles.tagDetailsHeader}>
            <span
              className={projectPageStyles.tagDot}
              style={{backgroundColor: glossary.color}}
            />
            <span>{glossary.label}</span>
          </div>
          <p>{glossary.description}</p>
          <a
            href={glossary.wikiUrl}
            target="_self"
            rel="noopener noreferrer"
            className={projectPageStyles.tagDetailsHint}
            onClick={() => setIsExpanded(false)}>
            Learn more
          </a>
        </div>
      </div>
    </li>
  );
}

function ShowMoreTagChip({to}: {to: string}) {
  return (
    <li className={projectPageStyles.tagItem}>
      <Link to={to} className={clsx(projectPageStyles.tag, styles.showMoreTagChip)}>
        Show more
      </Link>
    </li>
  );
}

function buildProjectSummary(description: string, max = 220) {
  if (description.length <= max) {
    return description;
  }

  return `${description.slice(0, max).trimEnd()}...`;
}

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
    cc_load_policy: '1',
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
  const visibleTags =
    activeProject.tags.length > MAX_VISIBLE_TAGS
      ? activeProject.tags.slice(0, MAX_VISIBLE_TAGS - 1)
      : activeProject.tags;
  const hasOverflowTags = activeProject.tags.length > MAX_VISIBLE_TAGS;

  return (
    <>
      <Head>
        <title>{`${activeProject.title} | Showcase Carousel`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={styles.page}>
        <section className={styles.carouselShell}>
          <div className={styles.contentGrid}>
            <section className={styles.videoPanel}>
              <header className={styles.topBar}>
                <div className={styles.brandBlock}>
                  <div className={styles.brandHeader}>
                    <img
                      className={styles.brandMark}
                      src="/img/temple-logo-horizontal.svg"
                      alt="Temple University"
                    />
                    <div className={styles.brandCopy}>
                      <p className={styles.eyebrow}>Temple University · CIS4398</p>
                      <h1 className={styles.title}>{HERO_TITLE}</h1>
                    </div>
                  </div>
                </div>
              </header>
              <div className={styles.videoStage}>
                <div className={styles.videoSurface}>
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
                          Scan for project details
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.videoControls}>
                <div className={styles.statusControls}>
                  <span className={styles.statusPill}>
                    {activeIndex + 1} / {projects.length}
                  </span>
                </div>
                <div className={styles.primaryControls}>
                  <button
                    type="button"
                    className={styles.controlButton}
                    onClick={() =>
                      setActiveIndex((current) => (current - 1 + projects.length) % projects.length)
                    }>
                    <span className={styles.controlIcon} aria-hidden="true">
                      ◀
                    </span>
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    className={clsx(styles.controlButton, styles.pauseButton)}
                    onClick={() => setIsPaused((current) => !current)}>
                    <span
                      className={clsx(styles.controlIcon, styles.pauseIcon)}
                      aria-hidden="true">
                      {isPaused ? '▶' : '⏸'}
                    </span>
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </button>
                  <button
                    type="button"
                    className={styles.controlButton}
                    onClick={() => setActiveIndex((current) => (current + 1) % projects.length)}>
                    <span>Next</span>
                    <span className={styles.controlIcon} aria-hidden="true">
                      ▶
                    </span>
                  </button>
                </div>
                <div className={styles.secondaryControls}>
                  <Link className={styles.utilityButton} to="/showcase" aria-label="Back to showcase">
                    <span className={styles.controlIcon} aria-hidden="true">
                      ↗
                    </span>
                    <span>Showcase grid</span>
                  </Link>
                </div>
              </div>
            </section>

            <aside className={styles.infoPanel}>
              <div className={styles.projectHero}>
                <div className={styles.projectMeta}>
                  <p className={styles.projectSemester}>
                    {activeProject.semester || 'Showcase project'}
                  </p>
                  <h2 className={styles.projectTitle}>{activeProject.title}</h2>
                  <p className={styles.projectSummary}>
                    {buildProjectSummary(activeProject.description)}
                  </p>
                  <ul className={clsx(projectPageStyles.tagList, styles.projectTagList)}>
                    {visibleTags.map((tag) => (
                      <TagChip key={String(tag)} tag={String(tag)} />
                    ))}
                    {hasOverflowTags ? <ShowMoreTagChip to={projectPath} /> : null}
                  </ul>
                </div>

                <div className={styles.qrSection}>
                  <img
                    className={styles.qrImage}
                    src={qrCodeUrl}
                    alt={`QR code for ${activeProject.title} showcase page`}
                  />
                  <p className={styles.qrCaption}>
                    Scan for details
                  </p>
                  <div className={styles.linkList}>
                    <a
                      className={styles.linkButton}
                      href={showcaseUrl}
                      target="_blank"
                      rel="noreferrer">
                      See project
                    </a>
                    {activeProject.website ? (
                      <a
                        className={styles.linkButton}
                        href={activeProject.website}
                        target="_blank"
                        rel="noreferrer">
                        Try demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              {previewImage ? (
                <div className={styles.thumbCard}>
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
