import React, { useEffect, useState } from 'react';

const GitHubClassroomLink = () => {
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

  return <a href={githubClassroomLink}>Click here to join the GitHub Classroom and get the starter project</a>;
};

export default GitHubClassroomLink;

