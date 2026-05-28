import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Contributors({ orgName, projectName: projectNameProp , githubURL: githubURLProp, columns = 4}) {
    const {siteConfig} = useDocusaurusContext();
    const {organizationName: orgNameConfig, projectName: projectNameConfig} = siteConfig;
    const [imageError, setImageError] = useState(false);

    let organizationName = orgName || orgNameConfig;
    let projectName = projectNameProp || projectNameConfig;
    if (githubURLProp) {
        try {
            const url = new URL(githubURLProp);
            const [orgFromUrl, repoFromUrl] = url.pathname.replace(/^\/+/, '').split('/');
            if (orgFromUrl && repoFromUrl) {
                organizationName = orgFromUrl;
                projectName = repoFromUrl;
            }
        } catch (error) {
            // Keep provided/default org and project if URL parsing fails.
        }
    }

    const repoKey = useMemo(
        () => `${organizationName}/${projectName}`,
        [organizationName, projectName],
    );

    useEffect(() => {
        setImageError(false);
    }, [repoKey]);

    const handleImageError = () => {
        setImageError(true);
    };

    const contributorsImageSrc = imageError
        ? 'https://via.placeholder.com/400x100/f0f0f0/666666?text=Contributors+Not+Available'
        : `https://contrib.rocks/image?columns=${columns}&repo=${repoKey}`;

    const linkHref = imageError
        ? 'tutorial/tutorial-basics/set-environment-variables'
        : `https://github.com/${repoKey}/graphs/contributors`;

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
