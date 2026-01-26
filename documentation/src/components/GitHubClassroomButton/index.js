import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';

const GitHubClassroomButton = ({ link }) => {
  const [githubClassroomLink, setGithubClassroomLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const finalLink = link
        ? link
        : window.location.hostname === 'capstone.ianapplebaum.com'
          ? 'https://classroom.github.com/a/hUCYbovh'// capstone
          : 'https://classroom.github.com/a/OnZTWK0I'; // software design
      setGithubClassroomLink(finalLink);
    }
  }, [link]);

  return (
    <div className={'col button_group'}>
      <Link
        className="button button--primary button--outline button--lg"
        to={githubClassroomLink}
      >
        <div>Create GitHub Team 🐙</div>
      </Link>
    </div>
  );
};

export default GitHubClassroomButton;

