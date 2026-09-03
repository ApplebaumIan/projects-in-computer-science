import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || '?';
}

export default function ProjectStakeholders() {
  const {frontMatter} = useDoc();
  const stakeholders = Array.isArray(frontMatter.stakeholders) ? frontMatter.stakeholders : [];

  if (!stakeholders.length) {
    return null;
  }

  return (
    <div className="stakeholders">
      {stakeholders.map((stakeholder, index) => {
        const name = stakeholder.name || 'Stakeholder';
        const key = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'stakeholder'}-${index}`;
        const title = stakeholder.role || stakeholder.affiliation;

        return (
          <figure key={key}>
            {stakeholder.image ? (
              <img src={stakeholder.image} alt={stakeholder.alt || `${name} portrait`} />
            ) : (
              <div className="stakeholder-avatar" aria-label={`${name} initials`} role="img">
                {initials(name)}
              </div>
            )}
            <figcaption>
              <span className="name">
                {stakeholder.url ? <a href={stakeholder.url}>{name}</a> : name}
              </span>
              {title && <br />}
              {stakeholder.role && <span className="job-title">{stakeholder.role}</span>}
              {stakeholder.role && stakeholder.affiliation && <br />}
              {stakeholder.affiliation && <span className="job-title">{stakeholder.affiliation}</span>}
            </figcaption>
            {stakeholder.bio && <p>{stakeholder.bio}</p>}
            {stakeholder.email && (
              <span className="email"><a href={`mailto:${stakeholder.email}`}>{stakeholder.email}</a></span>
            )}
          </figure>
        );
      })}
    </div>
  );
}
