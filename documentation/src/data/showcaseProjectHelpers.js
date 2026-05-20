function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeProjectLookupValue(value) {
  if (value == null) {
    return '';
  }

  let normalized = safeDecodeURIComponent(String(value));
  normalized = normalized.trim().replace(/^#+/, '');
  normalized = safeDecodeURIComponent(normalized);

  return normalized
    .trim()
    .toLowerCase();
}

function slugifyProjectValue(value) {
  return normalizeProjectLookupValue(value)
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getProjectSlug(project) {
  return normalizeProjectLookupValue(project.slug || slugifyProjectValue(project.title));
}

function getProjectTitleSlug(project) {
  return slugifyProjectValue(project.title);
}

function getProjectMemberSlugs(project) {
  const canonicalSlug = getProjectSlug(project);
  const titleSlug = getProjectTitleSlug(project);

  return Array.from(
    new Set(
      (project.members || [])
        .filter(Boolean)
        .flatMap((member) => {
          const memberSlug = slugifyProjectValue(member);
          return [
            slugifyProjectValue(`${member}-${project.title}`),
            slugifyProjectValue(`${project.title}-${member}`),
            canonicalSlug ? `${canonicalSlug}-${memberSlug}` : '',
            titleSlug ? `${titleSlug}-${memberSlug}` : '',
          ];
        })
        .filter(Boolean),
    ),
  );
}

function getProjectLookupKeys(project) {
  return Array.from(
    new Set(
      [
        getProjectSlug(project),
        project.legacySlug,
        ...(Array.isArray(project.aliases) ? project.aliases : []),
        getProjectTitleSlug(project),
        ...getProjectMemberSlugs(project),
      ]
        .map(normalizeProjectLookupValue)
        .filter(Boolean),
    ),
  );
}

function getProjectRouteAliases(project) {
  const canonicalSlug = getProjectSlug(project);
  return getProjectLookupKeys(project).filter((slug) => slug !== canonicalSlug);
}

function getProjectCardAnchorIds(project) {
  return getProjectLookupKeys(project);
}

function findProjectBySlug(projects, value) {
  const normalized = normalizeProjectLookupValue(value);
  if (!normalized) {
    return null;
  }

  return (
    projects.find((project) => getProjectLookupKeys(project).includes(normalized)) ??
    null
  );
}

function getProjectDetailPath(projectOrSlug) {
  const slug =
    typeof projectOrSlug === 'string'
      ? normalizeProjectLookupValue(projectOrSlug)
      : getProjectSlug(projectOrSlug);

  return `/showcase/projects/${slug}`;
}

function getProjectImage(project) {
  if (project.preview) {
    return project.preview;
  }

  const screenshotSource = project.useDocsAsPreview
    ? project.website || project.documentation
    : project.documentation || project.website;

  if (!screenshotSource) {
    return null;
  }

  return `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
    screenshotSource,
  )}/showcase/_764234242`;
}

function parseYoutubeUrl(url) {
  if (!url) {
    return {videoId: null, startTime: null};
  }

  const videoIdRegex =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const videoIdMatch = String(url).match(videoIdRegex);
  const videoId =
    videoIdMatch && videoIdMatch[2].length === 11 ? videoIdMatch[2] : null;

  const timeRegex = /[?&](?:t|start)=(\d+)/;
  const timeMatch = String(url).match(timeRegex);
  const startTime = timeMatch ? timeMatch[1] : null;

  return {videoId, startTime};
}

function parseSemester(semester) {
  if (!semester) {
    return null;
  }

  const [seasonRaw = '', yearRaw = ''] = String(semester).trim().split(/\s+/);
  const year = Number.parseInt(yearRaw, 10);
  if (!Number.isFinite(year)) {
    return null;
  }

  return {
    season: seasonRaw.toLowerCase(),
    year,
  };
}

function semesterSortKey(semester) {
  const parsed = parseSemester(semester);
  if (!parsed) {
    return -Infinity;
  }

  const seasonOrder = {
    spring: 0,
    summer: 1,
    fall: 2,
    winter: 3,
  };

  return parsed.year * 10 + (seasonOrder[parsed.season] ?? 9);
}

function getAcademicYearLabel(semester) {
  const parsed = parseSemester(semester);
  if (!parsed) {
    return '';
  }

  const startYear = parsed.season === 'fall' ? parsed.year : parsed.year - 1;
  return `${startYear} - ${startYear + 1}`;
}

function getProjectSystemOverviewCandidates(project) {
  const documentation = project?.documentation;
  if (!documentation) {
    return [];
  }

  try {
    const parsed = new URL(documentation);
    const basePath = parsed.pathname.endsWith('/')
      ? parsed.pathname
      : `${parsed.pathname}/`;
    const docsRoot = basePath.includes('/docs/')
      ? `${basePath.split('/docs/')[0]}/docs/`
      : `${basePath}docs/`;
    const base = `${parsed.origin}${docsRoot.replace(/\/+/g, '/')}`;

    return [
      `${base}requirements/system-overview`,
      `${base}requirements/system-overview/`,
    ];
  } catch {
    return [];
  }
}

function getProjectSystemOverviewUrl(project) {
  return getProjectSystemOverviewCandidates(project)[0] || null;
}

function buildProjectPageTitle(project) {
  const members = (project.members || []).filter(Boolean);
  let peopleClause = '';

  if (members.length === 1) {
    peopleClause = ` | ${members[0]}`;
  } else if (members.length === 2) {
    peopleClause = ` | ${members[0]} and ${members[1]}`;
  } else if (members.length > 2) {
    peopleClause = ` | ${members[0]} and team`;
  }

  return `${project.title}${peopleClause} Senior Project | Temple University CIS4398`;
}

function getProjectOverviewSummary(project, overviewMapping) {
  return (
    overviewMapping?.[getProjectSlug(project)]?.summary ||
    project.description ||
    ''
  );
}

function buildProjectMetaDescription(project, overviewMapping) {
  const memberNames = (project.members || []).filter(Boolean).join(', ');
  const nameClause = memberNames ? ` by ${memberNames}` : '';
  return `${project.title} senior project and capstone project from Temple University CIS4398${nameClause}. ${getProjectOverviewSummary(project, overviewMapping)}`;
}

function buildProjectStructuredData(project, overviewMapping) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: getProjectOverviewSummary(project, overviewMapping),
    author: (project.members || []).filter(Boolean).map((name) => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@type': 'CollegeOrUniversity',
      name: 'Temple University',
    },
    educationalLevel: 'Undergraduate',
    keywords: Array.from(
      new Set([
        'senior project',
        'capstone project',
        'Temple University',
        'CIS4398',
        ...((project.tags || []).map(String)),
      ]),
    ),
  };
}

function getRelatedProjects(projects, currentProject, limit = 3) {
  const currentSlug = getProjectSlug(currentProject);
  const currentTags = new Set((currentProject.tags || []).map(String));

  return [...projects]
    .filter((project) => getProjectSlug(project) !== currentSlug)
    .map((project) => {
      const overlap = (project.tags || []).filter((tag) => currentTags.has(String(tag)))
        .length;
      const sameSemester = project.semester && project.semester === currentProject.semester ? 1 : 0;
      return {
        overlap,
        project,
        recency: semesterSortKey(project.semester),
        sameSemester,
      };
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) {
        return b.overlap - a.overlap;
      }
      if (b.sameSemester !== a.sameSemester) {
        return b.sameSemester - a.sameSemester;
      }
      return b.recency - a.recency;
    })
    .filter((entry) => entry.overlap > 0)
    .slice(0, limit)
    .map((entry) => entry.project);
}

function extractProjectSlugFromPathname(pathname) {
  const cleanedPath = String(pathname || '').replace(/\/+$/, '');
  const segments = cleanedPath.split('/').filter(Boolean);
  return segments.at(-1) || '';
}

function resolveLegacyShowcaseRedirect(projects, locationLike) {
  const pathname = String(locationLike?.pathname || '').replace(/\/+$/, '');
  if (/\/showcase\/projects\/[^/]+$/i.test(pathname)) {
    return null;
  }

  const searchParams = new URLSearchParams(String(locationLike?.search || ''));
  const candidates = [
    locationLike?.hash,
    searchParams.get('project'),
    searchParams.get('anchor'),
    searchParams.get('slug'),
  ];

  for (const candidate of candidates) {
    const project = findProjectBySlug(projects, candidate);
    if (project) {
      return getProjectDetailPath(project);
    }
  }

  return null;
}

module.exports = {
  buildProjectMetaDescription,
  buildProjectPageTitle,
  buildProjectStructuredData,
  extractProjectSlugFromPathname,
  findProjectBySlug,
  getAcademicYearLabel,
  getProjectCardAnchorIds,
  getProjectDetailPath,
  getProjectImage,
  getProjectLookupKeys,
  getProjectRouteAliases,
  getProjectOverviewSummary,
  getProjectSlug,
  getProjectSystemOverviewCandidates,
  getProjectSystemOverviewUrl,
  getRelatedProjects,
  normalizeProjectLookupValue,
  parseYoutubeUrl,
  resolveLegacyShowcaseRedirect,
  slugifyProjectValue,
};
