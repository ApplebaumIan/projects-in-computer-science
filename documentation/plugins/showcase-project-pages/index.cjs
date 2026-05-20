const projects = require('../../src/data/showcaseProjects');
const {
  getProjectDetailPath,
  getProjectSlug,
  getProjectRouteAliases,
} = require('../../src/data/showcaseProjectHelpers');

module.exports = function showcaseProjectPagesPlugin() {
  return {
    name: 'showcase-project-pages',
    async contentLoaded({actions}) {
      const {addRoute, createData} = actions;

      for (const project of projects) {
        const canonicalSlug = getProjectSlug(project);
        const canonicalDataPath = await createData(
          `showcase-project-${canonicalSlug}.json`,
          {
            project,
            routeSlug: canonicalSlug,
            canonicalSlug,
          },
        );

        addRoute({
          path: getProjectDetailPath(project),
          component: require.resolve(
            '../../src/components/ShowcaseProjectPage/index.tsx',
          ),
          exact: true,
          modules: {
            projectPageData: canonicalDataPath,
          },
        });

        for (const aliasSlug of getProjectRouteAliases(project)) {
          const aliasDataPath = await createData(
            `showcase-project-${canonicalSlug}-alias-${aliasSlug}.json`,
            {
              project,
              routeSlug: aliasSlug,
              canonicalSlug,
            },
          );

          addRoute({
            path: getProjectDetailPath(aliasSlug),
            component: require.resolve(
              '../../src/components/ShowcaseProjectPage/index.tsx',
            ),
            exact: true,
            modules: {
              projectPageData: aliasDataPath,
            },
          });
        }
      }
    },
  };
};
