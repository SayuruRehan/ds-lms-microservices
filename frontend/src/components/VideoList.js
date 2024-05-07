import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Function to fetch videos from the backend
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4003/api/v1/video/list"
        ); // Assuming your backend API endpoint is '/api/videos/list'
        setVideos(response.data); // Update state with fetched videos
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos(); // Call the fetchVideos function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h2>Uploaded Videos</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <a
              href={video.lectureVideos}
              target="_blank"
              rel="noopener noreferrer"
            >
              {video.courseName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
