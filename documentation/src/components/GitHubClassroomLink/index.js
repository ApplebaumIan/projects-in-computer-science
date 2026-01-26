import React, { useEffect, useState } from 'react';

const GitHubClassroomLink = () => {
  const [githubClassroomLink, setGithubClassroomLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link =
        window.location.hostname === 'capstone.ianapplebaum.com'
          ? 'https://classroom.github.com/a/hUCYbovh' // capstone
          : 'https://classroom.github.com/a/OnZTWK0I';// software design
      setGithubClassroomLink(link);
    }
  }, []);

  return <a href={githubClassroomLink}>Click here to join the GitHub Classroom and get the starter project</a>;
};

export default GitHubClassroomLink;

