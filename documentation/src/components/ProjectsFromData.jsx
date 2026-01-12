import React from 'react';
// Try to import a static index to avoid runtime require.context/eval issues in dev server.
// Use the same named export `ShowcaseCardTag` from the ShowcaseCard index so we reuse the
// tags component used by showcase cards.
import { ShowcaseCardTag } from '../pages/showcase/_components/ShowcaseCard';
// Try to import a static index to avoid runtime require.context/eval issues in dev server.
let STATIC_INDEX = null;
try {
  // eslint-disable-next-line global-require
  STATIC_INDEX = require('../data/projects/_index.json');
} catch (e) {
  STATIC_INDEX = null;
}

function loadProjects() {
  // Only use the static prebuilt index to avoid runtime eval errors in dev server.
  if (Array.isArray(STATIC_INDEX) && STATIC_INDEX.length) return STATIC_INDEX;
  // If no static index is present, return an empty array (no dynamic require.context fallback)
  return [];
}

function groupBySemester(projects) {
  const map = {};
  projects.forEach((p) => {
    const sem = p.semester || 'Uncategorized';
    if (!map[sem]) map[sem] = [];
    map[sem].push(p);
  });
  return map;
}

const ProjectsFromData = () => {
  const projects = loadProjects();
  if (!projects || projects.length === 0) {
    return <p>No projects found.</p>;
  }

  // sort projects by title for stable order
  projects.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

  const grouped = groupBySemester(projects);
  const semesters = Object.keys(grouped).sort();

  return (
    <div>
      {semesters.map((sem) => (
        <section key={sem} style={{marginBottom: '2rem'}}>
          <h3>{sem}</h3>
          <table>
            <thead>
              <tr>
                <th style={{textAlign: 'left'}}>Project</th>
                <th style={{textAlign: 'left'}}>Description</th>
              </tr>
            </thead>
            <tbody>
              {grouped[sem].map((p) => (
                <tr key={p.slug}>
                  <td style={{verticalAlign: 'top', paddingRight: '1rem'}}>
                    <strong>{p.title}</strong>
                    {p.contact ? (
                      <div><a href={`mailto:${p.contact}`}>{p.contact}</a></div>
                    ) : null}
                  </td>
                  <td style={{verticalAlign: 'top'}}>
                    <p>{p.description}</p>
                    {p.tags && p.tags.length ? (
                        <ShowcaseCardTag tags={p.tags} />
                    ) : null}
                    {p.website ? (<div><a href={p.website}>More Information</a></div>) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

export default ProjectsFromData;
