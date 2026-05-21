import type {ReactNode} from 'react';
import React, {useEffect, useId, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Image from '@theme/IdealImage';
import DocPaginator from '@theme/DocPaginator';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useHistory} from '@docusaurus/router';
import {
  buildProjectMetaDescription,
  buildProjectPageTitle,
  buildProjectStructuredData,
  getProjectDetailPath,
  getProjectImage,
  getProjectOverview,
  getProjectOverviewContentHtml,
  getProjectOverviewSourceUrl,
  getRelatedProjects,
  getProjectSlug,
  parseYoutubeUrl,
  showcaseSystemOverviews,
  sortedUsers,
  description,
  Tags,
  type User,
} from '@site/src/data/showcase';
import {getGlossaryTagMetadata} from '@site/src/data/showcaseGlossary';
import Contributors from '@site/src/components/Contributors';
import styles from './styles.module.css';
import Admonition from '@theme/Admonition';

function buildAbsoluteUrl(siteUrl: string, baseUrl: string, path: string) {
  return new URL(path.replace(/^\//, ''), `${siteUrl}${baseUrl}`).toString();
}

function TagChip({tag}: {tag: string}) {
  const glossary = getGlossaryTagMetadata(tag);
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  return (
    <li className={clsx(styles.tagItem, isExpanded && styles.tagItemExpanded)}>
      <button
        type="button"
        className={styles.tag}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={() => setIsExpanded((current) => !current)}>
        <span
          className={styles.tagDot}
          style={{backgroundColor: glossary.color}}
        />
        <span>{glossary.label}</span>
      </button>
      <div
        id={detailsId}
        className={styles.tagDetails}
        aria-hidden={!isExpanded}>
        <div className={styles.tagDetailsInner}>
          <div className={styles.tagDetailsHeader}>
            <span
              className={styles.tagDot}
              style={{backgroundColor: glossary.color}}
            />
            <span>{glossary.label}</span>
          </div>
          <p>{glossary.description}</p>
          <a
            href={glossary.wikiUrl}
            target="_self"
            rel="noopener noreferrer"
            className={styles.tagDetailsHint}
            onClick={() => setIsExpanded(false)}>
            Learn more
          </a>
        </div>
      </div>
    </li>
  );
}

function getProjectPagination(project: User) {
  const currentSlug = getProjectSlug(project);
  const currentIndex = sortedUsers.findIndex(
    (candidate) => getProjectSlug(candidate) === currentSlug,
  );

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  const previousProject = sortedUsers[currentIndex - 1];
  const nextProject = sortedUsers[currentIndex + 1];

  return {
    previous: previousProject
      ? {
          permalink: getProjectDetailPath(previousProject),
          title: previousProject.title,
        }
      : undefined,
    next: nextProject
      ? {
          permalink: getProjectDetailPath(nextProject),
          title: nextProject.title,
        }
      : undefined,
  };
}

function BackLinkButton() {
  return (
    <Link to="/showcase" className={`button button--secondary ${styles.backLink}`}>
      <span className={styles.backLinkIcon} aria-hidden="true">
        ←
      </span>
      <span>Back to showcase</span>
    </Link>
  );
}

function ProjectMetaChips({
  semester,
  compact = false,
}: {
  semester?: string;
  compact?: boolean;
}) {
  const items = [
    semester ? {label: 'Semester', value: semester} : null,
  ].filter(Boolean) as {label: string; value: string}[];

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={compact ? `${styles.metaList} ${styles.metaListCompact}` : styles.metaList}>
      {items.map((item) => (
        <li
          key={item.label}
          className={compact ? `${styles.metaChip} ${styles.metaChipCompact}` : styles.metaChip}>
          <span className={styles.metaChipValue}>{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

function ActionButtonIcon({kind}: {kind: 'website' | 'documentation' | 'demo' | 'source'}) {
  if (kind === 'website') {
    return (
      <svg
        className={styles.actionIcon}
        viewBox="0 0 640 640"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
      </svg>
    );
  }

  if (kind === 'documentation') {
    return (
      <svg
        className={styles.actionIcon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false">
        <path d="M2.462 22.201h12.321a2.466 2.466 0 0 0 2.369-1.854c.026.004.052.008.079.008a.621.621 0 0 0 .615-.615.621.621 0 0 0-.615-.615c-.027 0-.053.004-.079.007l-.014-.055a.62.62 0 0 0 .378-.568.621.621 0 0 0-.615-.615.608.608 0 0 0-.371.127l-.042-.041a.606.606 0 0 0 .125-.368c0-.67-.919-.858-1.181-.241l-.055-.014c.003-.026.008-.052.008-.079a.622.622 0 0 0-.616-.615.621.621 0 0 0-.615.615h-.096a.617.617 0 0 0-1.033 0h-.717v-2.461h2.461c.115 0 .226-.017.331-.047a.307.307 0 1 0 .529-.304l.02-.021c.052.04.116.064.186.064h.002c.337 0 .428-.463.117-.591l.007-.028c.013.001.026.004.039.004a.31.31 0 0 0 .308-.308.31.31 0 0 0-.308-.308c-.013 0-.026.003-.039.004a.28.28 0 0 1-.007-.027c.327-.13-.028-.745-.305-.528l-.02-.021a.307.307 0 0 0 .062-.184c-.011-.326-.454-.416-.591-.12a1.238 1.238 0 0 0-.32-.047h-2.143a2.465 2.465 0 0 1 2.132-1.23h7.385V9.894l-8.618-.539a1.315 1.315 0 0 1-1.229-1.308c0-.688.542-1.265 1.229-1.307l8.618-.539v-1.23a2.473 2.473 0 0 0-2.462-2.462H8.615l-.307-.533a.356.356 0 0 0-.616 0l-.307.533-.308-.533a.355.355 0 0 0-.615 0l-.308.533-.308-.533a.355.355 0 0 0-.615 0l-.308.533-.008.001-.51-.51a.354.354 0 0 0-.594.159l-.168.628-.639-.171a.357.357 0 0 0-.436.435l.172.639-.628.169a.356.356 0 0 0-.16.594l.51.51v.008l-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.307a.356.356 0 0 0 0 .616l.533.307-.533.308a.355.355 0 0 0 0 .615l.533.308-.533.308a.355.355 0 0 0 0 .615l.533.308a2.463 2.463 0 0 1-2.13-1.231A2.465 2.465 0 0 0 0 19.74c0 1.35 1.112 2.46 2.462 2.461zm19.692-5.204v2.743a2.473 2.473 0 0 1-2.461 2.461h-.001 1.231a2.466 2.466 0 0 0 2.383-1.854c.026.004.052.008.079.008A.621.621 0 0 0 24 19.74a.621.621 0 0 0-.615-.615c-.027 0-.053.004-.079.007l-.014-.055a.62.62 0 0 0 .378-.568.621.621 0 0 0-.615-.615.608.608 0 0 0-.371.127l-.042-.041a.612.612 0 0 0 .125-.368.623.623 0 0 0-.613-.615zm-4.067 2.62h2.223c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-2.223a.845.845 0 0 0 0-.246zm-.33-1.231h2.553c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-2.553a.845.845 0 0 0 0-.246zm-1.026-1.231h3.579c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-3.474a.85.85 0 0 0-.105-.246zm3.579-.984h-6.159a.126.126 0 0 1-.123-.123c0-.068.056-.123.123-.123h6.159c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123zm1.844-3.816v2.462c.115 0 .225-.017.331-.047a.308.308 0 1 0 .528-.304l.021-.021c.052.04.116.064.186.064a.312.312 0 0 0 .307-.308.306.306 0 0 0-.189-.283l.007-.028c.013.001.026.004.04.004a.312.312 0 0 0 .307-.308.312.312 0 0 0-.307-.308c-.014 0-.027.003-.04.004l-.007-.027a.31.31 0 0 0-.118-.592.306.306 0 0 0-.186.064l-.021-.021a.3.3 0 0 0 .063-.184c-.011-.326-.454-.416-.591-.12a1.24 1.24 0 0 0-.321-.047zm-6.059 2.339h4.215c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-4.451a.564.564 0 0 0 .073-.19.553.553 0 0 0 .163-.056zm.454-1.208h3.761c.067 0 .123.056.123.123a.124.124 0 0 1-.123.123h-3.772a.552.552 0 0 0 .011-.246zm5.605-6.225h-.004c-.381.013-.561.393-.719.729-.166.35-.294.578-.504.572-.233-.009-.366-.271-.506-.549-.162-.32-.347-.682-.734-.668-.375.013-.556.344-.715.636-.169.311-.285.5-.507.491-.237-.008-.363-.222-.509-.469-.163-.275-.351-.585-.731-.574-.368.013-.549.294-.709.542-.169.262-.287.421-.513.412-.243-.009-.368-.186-.513-.391-.163-.231-.347-.491-.726-.479-.36.013-.541.243-.701.446-.151.192-.27.344-.52.335h-.005a.126.126 0 0 0-.123.123c0 .066.053.121.119.123.371.012.559-.222.723-.429.145-.184.27-.343.516-.352.237-.01.348.138.516.375.16.226.341.482.705.495.382.013.566-.273.729-.525.145-.226.271-.421.511-.429.22-.008.34.166.51.453.159.271.34.577.712.59.385.014.57-.322.732-.619.14-.257.273-.5.507-.508.221-.005.336.196.506.533.159.314.339.67.717.684h.021c.377 0 .556-.378.714-.713.14-.297.273-.576.501-.588zM7.385 6.509a.312.312 0 0 1-.308-.308c-.01-.532-.378-.911-.927-.922-.528-.011-.888.432-.919.922-.011.168-.139.307-.308.308a.31.31 0 0 1-.308-.308c0-.848.69-1.538 1.539-1.538.848 0 1.538.69 1.538 1.538a.312.312 0 0 1-.307.308zm9.846-2.308a.31.31 0 0 1 .308.308.31.31 0 0 1-.308.308.31.31 0 0 1-.308-.308.31.31 0 0 1 .308-.308zm2.461-.153a.31.31 0 0 1 .307.308.31.31 0 0 1-.308.308h-.001a.31.31 0 0 1-.307-.308.31.31 0 0 1 .308-.308z" />
      </svg>
    );
  }

  if (kind === 'demo') {
    return (
      <svg
        className={styles.actionIcon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  return (
    <svg
      className={styles.actionIcon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.37 7.86 10.88.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.38-3.88-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.57.24 2.73.12 3.02.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.79 1.08.79 2.18 0 1.58-.01 2.86-.01 3.25 0 .31.21.68.8.56C20.71 21.37 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function ProjectLinkList({project}: {project: User}) {
  const links = [
    project.website
      ? {label: 'Project Site', href: project.website, icon: 'website' as const}
      : null,
    project.documentation
      ? {
          label: 'Documentation',
          href: project.documentation,
          icon: 'documentation' as const,
        }
      : null,
    project.demo
      ? {label: 'Live Demo', href: project.demo, icon: 'demo' as const}
      : null,
    project.source
      ? {label: 'GitHub', href: project.source, icon: 'source' as const}
      : null,
  ].filter(Boolean) as {
    label: string;
    href: string;
    icon: 'website' | 'documentation' | 'demo' | 'source';
  }[];

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={styles.actions}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`button button--secondary button--lg ${styles.actionButton}`}>
          <span className={styles.buttonContent}>
            <ActionButtonIcon kind={link.icon} />
            <span className={styles.buttonText}>{link.label}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function RelatedProjectCard({project}: {project: User}) {
  const image = getProjectImage(project);
  const projectPath = getProjectDetailPath(project);
  const tagLabels = (project.tags || [])
    .slice(0, 4)
    .map((tag) => Tags[String(tag) as keyof typeof Tags]?.label ?? String(tag));

  return (
    <li className={styles.relatedCard}>
      <Link to={projectPath} className={styles.relatedMedia} aria-label={`Open ${project.title}`}>
        {project.semester && (
          <span className={styles.relatedSemesterChip}>{project.semester}</span>
        )}
        {image ? <img src={image} alt={project.title} className={styles.relatedImage} /> : null}
      </Link>
      <div className={styles.relatedContent}>
        <h3 className={styles.relatedTitle}>
          <Link to={projectPath}>{project.title}</Link>
        </h3>
        {tagLabels.length > 0 && (
          <ul className={styles.relatedTagList}>
            {tagLabels.map((label) => (
              <li key={label} className={styles.relatedTag}>
                {label}
              </li>
            ))}
          </ul>
        )}
        <Link to={projectPath} className={styles.relatedCta}>
          View project
        </Link>
      </div>
    </li>
  );
}

function ProjectPageBody({project}: {project: User}) {
  const image = getProjectImage(project);
  const {videoId, startTime} = parseYoutubeUrl(project.demo);
  const overview = getProjectOverview(project);
  const overviewContentHtml = getProjectOverviewContentHtml(project);
  const overviewSourceUrl = getProjectOverviewSourceUrl(project);
  const overviewParagraphs = overview
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const relatedProjects = getRelatedProjects(sortedUsers, project, 3);
  const pagination = getProjectPagination(project);

  return (
    <main className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <BackLinkButton />

        <header className={styles.hero}>
          <div className={styles.copy}>
            <div className={styles.eyebrowRow}>
              <div className={styles.eyebrow}>Temple University CIS4398</div>
              <ProjectMetaChips semester={project.semester} compact />
            </div>
            <Heading as="h1" className={styles.title}>
              {project.title}
            </Heading>
            {project.source && (
              <div className={styles.contributorsWrap}>
                <Contributors githubURL={project.source} columns={9} />
              </div>
            )}
            <div className={styles.subtitle}>
              {project.members?.length ? project.members.join(', ') : 'Capstone project team'}
            </div>
            <ProjectLinkList project={project} />
          </div>

          {(image || videoId) && (
            <div className={styles.mediaCard}>
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}${
                    startTime ? `?start=${startTime}` : ''
                  }`}
                  title={`${project.title} demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.video}
                />
              ) : image ? (
                <Image img={image} alt={project.title} />
              ) : null}
            </div>
          )}
        </header>

        <section className={styles.section}>
          <Heading as="h2">Project Overview</Heading>
          {overviewContentHtml ? (
            <div
              className={styles.overviewContent}
              dangerouslySetInnerHTML={{__html: overviewContentHtml}}
            />
          ) : (
            overviewParagraphs.map((paragraph, index) => (
              <p key={index} className={styles.description}>
                {paragraph}
              </p>
            ))
          )}
          {overviewSourceUrl && (
            <p className={styles.sourceNote}>
              Overview fetched from the project&apos;s{' '}
              <a href={overviewSourceUrl} target="_blank" rel="noopener noreferrer">
                system overview page
              </a>
              .
            </p>
          )}
        </section>

        {project.tags.length > 0 && (
          <section className={styles.section}>
            <Heading as="h2">Tags & Technologies</Heading>
            <ul className={styles.tagList}>
              {project.tags.map((tag) => (
                <TagChip key={tag} tag={String(tag)} />
              ))}
            </ul>
          </section>
        )}

        {relatedProjects.length > 0 && (
          <section className={styles.section} data-nosnippet="true">
            <Heading as="h2">Similar Projects</Heading>
            <div className={styles.sectionIntro}>
              A few nearby projects from the showcase that overlap in topic or
              technology.
            </div>
            <ul className={`clean-list ${styles.relatedList}`}>
              {relatedProjects.map((relatedProject) => (
                <RelatedProjectCard key={relatedProject.slug} project={relatedProject} />
              ))}
            </ul>
          </section>
        )}

        <section className={styles.section}>
          <Admonition type="note" title="Explore More">
          {/*<Heading as="h2">Explore More</Heading>*/}
          <div className={styles.sectionIntro}>
            Browse the full cohort, compare projects, and use filters on the
            main showcase page.
          </div>
          <Link to="/showcase" className="button button--primary button--lg">
            Open Showcase
          </Link>
          </Admonition>
        </section>


        {(pagination.previous || pagination.next) && (
          <DocPaginator
            className={styles.pagination}
            previous={pagination.previous}
            next={pagination.next}
          />
        )}
      </div>
    </main>
  );
}

type ProjectPageData = {
  project: User;
  routeSlug: string;
  canonicalSlug: string;
};

type ShowcaseProjectPageProps = {
  projectPageData?: ProjectPageData;
};

export default function ShowcaseProjectPage({
  projectPageData,
}: ShowcaseProjectPageProps): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const history = useHistory();
  const project = projectPageData?.project ?? null;
  const routeSlug = projectPageData?.routeSlug ?? '';
  const canonicalSlug = projectPageData?.canonicalSlug ?? '';

  if (!project) {
    return (
      <Layout title="Project Not Found" description="Project detail page not found.">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <main className={styles.page}>
          <div className={`container ${styles.layout}`}>
            <BackLinkButton />
            <Heading as="h1">Project not found</Heading>
            <p>The requested showcase project could not be found.</p>
          </div>
        </main>
      </Layout>
    );
  }

  const title = buildProjectPageTitle(project);
  const description = buildProjectMetaDescription(project, showcaseSystemOverviews);
  const canonicalPath = getProjectDetailPath(project);
  const canonicalUrl = buildAbsoluteUrl(
    siteConfig.url,
    siteConfig.baseUrl,
    canonicalPath,
  );
  const structuredData = {
    ...buildProjectStructuredData(project, showcaseSystemOverviews),
    url: canonicalUrl,
  };
  const ogImage =
    getProjectImage(project) ||
    buildAbsoluteUrl(siteConfig.url, siteConfig.baseUrl, 'img/Dont_Panic.png');

  useEffect(() => {
    if (routeSlug && canonicalSlug && routeSlug !== canonicalSlug) {
      history.replace(canonicalPath);
    }
  }, [canonicalPath, canonicalSlug, history, routeSlug]);

  return (
    <Layout description={description}>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <ProjectPageBody project={project} />
    </Layout>
  );
}
