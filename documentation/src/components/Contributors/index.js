import React, { useState } from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Contributors({ orgName, projectName: projectNameProp , githubURL: githubURLProp, columns = 4}) {
    const {siteConfig} = useDocusaurusContext();
    const {organizationName: orgNameConfig, projectName: projectNameConfig} = siteConfig;
    const [imageError, setImageError] = useState(false);

    let organizationName = orgName || orgNameConfig;
    let projectName = projectNameProp || projectNameConfig;
    if (githubURLProp) {
        organizationName = githubURLProp.split('github.com/')[1].split('/')[0];
        projectName = githubURLProp.split('github.com/')[1].split('/')[1];
    }
    const handleImageError = () => {
        setImageError(true);
    };

    const contributorsImageSrc = imageError
        ? 'https://via.placeholder.com/400x100/f0f0f0/666666?text=Contributors+Not+Available'
        : `https://contrib.rocks/image?columns=${columns}&repo=${organizationName}/${projectName}`;

    const linkHref = imageError
        ? 'tutorial/tutorial-basics/set-environment-variables'
        : `https://github.com/${organizationName}/${projectName}/graphs/contributors`;

    return <div className={styles.contributors}>
        <a href={linkHref}>
            <img
                src={contributorsImageSrc}
                alt={imageError ? 'Contributors image not available - click to learn how to set environment variables.' : 'Contributors'}
                onError={handleImageError}
            />
        </a>
    </div>;
}
