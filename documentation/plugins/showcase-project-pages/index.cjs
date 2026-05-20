const projects = require('../../src/data/showcaseProjects');
const {
  getProjectDetailPath,
  getProjectRouteAliases,
} = require('../../src/data/showcaseProjectHelpers');

module.exports = function showcaseProjectPagesPlugin() {
  return {
    name: 'showcase-project-pages',
    async contentLoaded({actions}) {
      const {addRoute} = actions;

      projects.forEach((project) => {
        addRoute({
          path: getProjectDetailPath(project),
          component: require.resolve(
            '../../src/components/ShowcaseProjectPage/index.tsx',
          ),
          exact: true,
        });

        getProjectRouteAliases(project).forEach((aliasSlug) => {
          addRoute({
            path: getProjectDetailPath(aliasSlug),
            component: require.resolve(
              '../../src/components/ShowcaseProjectPage/index.tsx',
            ),
            exact: true,
          });
        });
      });
    },
  };
};
