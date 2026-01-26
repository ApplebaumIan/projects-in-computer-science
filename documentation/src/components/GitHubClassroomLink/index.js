import React, { useEffect, useState } from 'react';

const GitHubClassroomLink = ({ link }) => {
  const [githubClassroomLink, setGithubClassroomLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const finalLink = link
        ? link
        : window.location.hostname === 'capstone.ianapplebaum.com'
          ? 'https://classroom.github.com/a/hUCYbovh' // capstone
          : 'https://classroom.github.com/a/OnZTWK0I';// software design
      setGithubClassroomLink(finalLink);
    }
  }, [link]);

  return <a href={githubClassroomLink}>Click here to join the GitHub Classroom and get the starter project</a>;
};

export default GitHubClassroomLink;

