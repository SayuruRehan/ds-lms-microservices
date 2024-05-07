import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminCourseView() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState("Pending");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4003/api/v1/course/get"
      );
      const initialCourses = response.data.map((course) => ({
        ...course,
        status: "Pending",
      }));
      setCourses(initialCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses. Please try again later.");
    }
  };

  const approveCourse = (courseId) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, status: "Approved" } : course
    );
    setCourses(updatedCourses);
  };

  const rejectCourse = (courseId) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, status: "Rejected" } : course
    );
    setCourses(updatedCourses);
  };

  const filteredCourses = courses.filter(
    (course) => course.status === currentTab
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Course List</h1>
      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 ${
            currentTab === "Pending" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCurrentTab("Pending")}
        >
          Pending
        </button>
        <button
          className={`mr-4 px-4 py-2 ${
            currentTab === "Approved"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setCurrentTab("Approved")}
        >
          Approved
        </button>
        <button
          className={`mr-4 px-4 py-2 ${
            currentTab === "Rejected" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCurrentTab("Rejected")}
        >
          Rejected
        </button>
      </div>
      <div className="grid gap-6">
        {filteredCourses.map((course, index) => (
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
            {course.status === "Pending" && (
              <div>
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2"
                  onClick={() => approveCourse(course.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => rejectCourse(course.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCourseView;
