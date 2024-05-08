import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

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

  const handleViewDetails = (courseId) => {
    setExpandedCourseId(courseId === expandedCourseId ? null : courseId);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Course List</h1>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
              {course.CourseName}
              </h2>
              {course.preview && (
                <img
                  src={`http://localhost:4003/${course.preview.replace(
                    "\\",
                    "/"
                  )}`}
                  alt="Preview"
                  className="w-full mb-2 rounded-md cursor-pointer"
                  onClick={() => handleViewDetails(course._id)}
                />
              )}
              {expandedCourseId === course._id && (
                <div>
                  <p className="mb-2">Instructor: {course.instructor}</p>
                  <p className="mb-2">Description: {course.description}</p>
                  <p className="mb-2">Duration: {course.duration}</p>
                  <p className="mb-2">Level: {course.level}</p>
                  <p className="mb-2">Price: ${course.price}</p>
                  <h3 className="text-lg font-semibold mb-2">Lessons:</h3>
                  <ul className="list-disc pl-6">
                    {course.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex}>
                        <div className="mb-2">
                          <span className="font-semibold">Title:</span>{" "}
                          {lesson.title}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Description:</span>{" "}
                          {lesson.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-2">
                    Lecture Notes:{" "}
                    {course.lectureNotes && (
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
                    )}
                  </p>
                  <p className="mb-2">
                    Lecture Videos:{" "}
                    {course.lectureVideos && (
                      <a
                        href={`http://localhost:4003/${course.lectureVideos.replace(
                          "\\",
                          "/"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Video
                      </a>
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-gray-100 px-6 py-4">
              <button
                onClick={() => handleViewDetails(course._id)}
                className="text-blue-500 hover:underline"
              >
                {expandedCourseId === course._id
                  ? "Hide Details"
                  : "View Details"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
