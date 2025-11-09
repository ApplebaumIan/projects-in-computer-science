import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';

const GitHubClassroomButton = () => {
  const [githubClassroomLink, setGithubClassroomLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link =
        window.location.hostname === 'capstone.ianapplebaum.com'
          ? 'https://classroom.github.com/a/g1vGIH_d'
          : 'https://classroom.github.com/a/YOUR_SOFTWARE_DESIGN_CLASSROOM_ID';
      setGithubClassroomLink(link);
    }
  }, []);

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

