const test = require('node:test');
const assert = require('node:assert/strict');
const projects = require('./showcaseProjects');
const helpers = require('./showcaseProjectHelpers');

test('slug generation normalizes project names', () => {
  assert.equal(helpers.slugifyProjectValue('VibeCheck'), 'vibecheck');
  assert.equal(
    helpers.slugifyProjectValue(' Vehicle Collision Automatic Detection '),
    'vehicle-collision-automatic-detection',
  );
});

test('finds projects by canonical slug', () => {
  const project = helpers.findProjectBySlug(projects, 'collabybot');
  assert.equal(project?.title, 'CollabyBot');
});

test('finds projects by derived legacy title slug', () => {
  const project = helpers.findProjectBySlug(projects, 'vibecheck');
  assert.equal(project?.slug, 'bereal-chatbot');
});

test('finds projects by explicit alias when present', () => {
  const project = helpers.findProjectBySlug(
    [
      {
        title: 'Alias Demo',
        slug: 'alias-demo',
        aliases: ['legacy-demo'],
      },
    ],
    'legacy-demo',
  );

  assert.equal(project?.slug, 'alias-demo');
});

test('share links use dedicated project detail paths', () => {
  const project = helpers.findProjectBySlug(projects, 'bereal-chatbot');
  assert.equal(
    helpers.getProjectDetailPath(project),
    '/showcase/projects/bereal-chatbot',
  );
});

test('canonical project detail paths stay short and slug-based', () => {
  const project = helpers.findProjectBySlug(projects, 'study-buddy');
  assert.equal(
    helpers.getProjectDetailPath(project),
    '/showcase/projects/study-buddy',
  );
  assert.doesNotMatch(
    helpers.getProjectDetailPath(project),
    /mary-clay|christine-cho|alexander-russakoff/i,
  );
});

test('system overview URL is derived from the documentation site', () => {
  const project = helpers.findProjectBySlug(projects, 'bereal-chatbot');
  assert.equal(
    helpers.getProjectSystemOverviewUrl(project),
    'https://capstone-projects-2026-spring.github.io/project-bereal-chatbot/docs/requirements/system-overview',
  );
});

test('legacy hash redirect resolves to the new detail page', () => {
  assert.equal(
    helpers.resolveLegacyShowcaseRedirect(projects, {
      pathname: '/showcase',
      hash: '#vibecheck',
      search: '',
    }),
    '/showcase/projects/bereal-chatbot',
  );
});

test('legacy query redirect resolves to the new detail page', () => {
  assert.equal(
    helpers.resolveLegacyShowcaseRedirect(projects, {
      pathname: '/showcase',
      hash: '',
      search: '?project=COLLABYBOT',
    }),
    '/showcase/projects/collabybot',
  );
});

test('legacy anchor and slug query params both redirect', () => {
  assert.equal(
    helpers.resolveLegacyShowcaseRedirect(projects, {
      pathname: '/showcase',
      hash: '',
      search: '?anchor=vibecheck',
    }),
    '/showcase/projects/bereal-chatbot',
  );

  assert.equal(
    helpers.resolveLegacyShowcaseRedirect(projects, {
      pathname: '/showcase',
      hash: '',
      search: '?slug=collabybot',
    }),
    '/showcase/projects/collabybot',
  );
});

test('unmatched legacy anchors fail gracefully', () => {
  assert.equal(
    helpers.resolveLegacyShowcaseRedirect(projects, {
      pathname: '/showcase',
      hash: '#not-a-project',
      search: '',
    }),
    null,
  );
});

test('project metadata includes SEO phrases and student names', () => {
  const project = helpers.findProjectBySlug(projects, 'bereal-chatbot');
  const description = helpers.buildProjectMetaDescription(project);
  const title = helpers.buildProjectPageTitle(project);

  assert.match(description, /senior project/i);
  assert.match(description, /capstone project/i);
  assert.match(description, /Temple University/i);
  assert.match(description, /CIS4398/i);
  assert.match(description, /Justin Pham/);
  assert.equal(
    title,
    'VibeCheck Senior Project | Temple University CIS4398',
  );
});

test('structured data is emitted as a CreativeWork payload', () => {
  const project = helpers.findProjectBySlug(projects, 'collabybot');
  const payload = helpers.buildProjectStructuredData(project);

  assert.equal(payload['@type'], 'CreativeWork');
  assert.equal(payload.publisher.name, 'Temple University');
  assert.ok(payload.author.some((author) => author.name === 'Sofia Drachuk'));
});

test('related projects rank by shared tags', () => {
  const current = helpers.findProjectBySlug(projects, 'bereal-chatbot');
  const related = helpers.getRelatedProjects(projects, current, 3);

  assert.ok(related.length > 0);
  assert.notEqual(related[0].slug, current.slug);
  assert.ok(
    related[0].tags.some((tag) => current.tags.includes(tag)),
  );
});

test('name-based alias slugs resolve to the canonical short project route', () => {
  const project = helpers.findProjectBySlug(
    projects,
    'mary-clay-study-buddy',
  );
  const reverseOrderProject = helpers.findProjectBySlug(
    projects,
    'study-buddy-mary-clay',
  );

  assert.equal(project?.slug, 'study-buddy');
  assert.equal(reverseOrderProject?.slug, 'study-buddy');
  assert.equal(
    helpers.getProjectDetailPath(project),
    '/showcase/projects/study-buddy',
  );
  assert.ok(
    helpers.getProjectRouteAliases(project).includes('mary-clay-study-buddy'),
  );
  assert.ok(
    helpers.getProjectRouteAliases(project).includes('study-buddy-mary-clay'),
  );
});
