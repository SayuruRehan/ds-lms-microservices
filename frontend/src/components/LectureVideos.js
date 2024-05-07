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
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lecture Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">
              Course Name: {video.courseName}
            </h2>
            <video className="w-full" controls>
              <source
                src={`http://localhost:4003/Videos/${video.lectureVideos}`}
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
