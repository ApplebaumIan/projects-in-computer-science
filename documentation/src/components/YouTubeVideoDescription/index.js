import React, { useState, useEffect } from 'react';
import axios from 'axios';
function VideoDescription({ description }) {
    // Regular expression to match URLs in the description
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Replace URLs with clickable hyperlinks
    const formattedDescription = description.replace(urlRegex, url => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    // Replace newlines with <br> tags
    const formattedHtml = formattedDescription.replace(/\n/g, '<br>');

    return <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
}

const YouTubeVideoDescription = ({ videoId }) => {

    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyA_MkRba4RRIrigTVPTnNA8Ax2Gq3i01Q0`)
      .then(response => response.json())
      .then(data => setDescription(data.items[0].snippet.description))
      .catch(error => console.error(error));
    }, [videoId]);

    return <VideoDescription description={description} />
};

export default YouTubeVideoDescription;
