import React, { useState, useEffect } from "react";

function LectureVideos() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:4003/api/v1/video/list");
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch lecture videos");
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching lecture videos:", error);
      setError("Error fetching lecture videos. Please try again later.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Lecture Videos</h1>
      <div>
        {videos.map((video, index) => (
          <div key={index}>
            <h2>Course Name: {video.courseName}</h2>
            <video controls>
              <source
                src={`/lectureVideos/videos/${video.lectureVideos}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LectureVideos;
