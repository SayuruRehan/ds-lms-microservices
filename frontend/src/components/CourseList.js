import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4003/api/v1/course/get"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses. Please try again later.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Course List</h1>
      <div>
        {courses.map((course, index) => (
          <div key={index}>
            <h2>Title: {course.title}</h2>
            <p>Instructor: {course.instructor}</p>
            <p>Description: {course.description}</p>
            <p>Duration: {course.duration}</p>
            <p>Level: {course.level}</p>
            <p>Price: ${course.price}</p>
            <p>Lecture Notes: {getFileName(course.lectureNotes)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getFileName(filePath) {
  // Extract file name from file path
  return filePath.split("/").pop();
}

export default CourseList;
