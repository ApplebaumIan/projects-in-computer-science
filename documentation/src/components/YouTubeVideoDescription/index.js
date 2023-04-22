import React, { useState, useEffect } from 'react';
import axios from 'axios';
function VideoDescription({ description }) {
    const formattedDescription = description.replace(/\n/g, '<br>');
    return <div dangerouslySetInnerHTML={{ __html: formattedDescription }} />;
}

const YouTubeVideoDescription = ({ videoId }) => {

    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyA_MkRba4RRIrigTVPTnNA8Ax2Gq3i01Q0`,
            );
            setDescription(result.data.items[0].snippet.description);
            console.log(result.data.items[0].snippet.description);
        };
        fetchData();
    }, [videoId]);

    return <VideoDescription description={description} />
};

export default YouTubeVideoDescription;
