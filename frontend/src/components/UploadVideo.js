import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [courseName, setCourseName] = useState("");
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("courseName", courseName);
      formData.append("lectureVideos", video);

      await axios.post("http://localhost:4003/api/v1/video/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Video uploaded successfully!");
    } catch (error) {
      setMessage("Error uploading video. Please try again later.");
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Upload Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadVideo;
