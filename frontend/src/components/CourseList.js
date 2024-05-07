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
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Course List</h1>
      <div className="grid gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold mb-2">
              Title: {course.title}
            </h2>
            <p className="mb-2">Instructor: {course.instructor}</p>
            <p className="mb-2">Description: {course.description}</p>
            <p className="mb-2">Duration: {course.duration}</p>
            <p className="mb-2">Level: {course.level}</p>
            <p className="mb-2">Price: ${course.price}</p>
            <p className="mb-2">
              Lecture Notes:{" "}
              <a
                href={`http://localhost:4003/${course.lectureNotes.replace(
                  "\\",
                  "/"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View PDF
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
