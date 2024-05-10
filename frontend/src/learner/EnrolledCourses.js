import React, { useState, useEffect } from "react";
import axios from "axios";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4002/learner/enrollments/614f55396a149b001f8a652f");
        setCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container px-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">Enrolled Courses</h1>
      <div className="flex mb-4">
        <button className="px-3 py-1 mr-2 text-white bg-blue-500 rounded">
          Enrolled Courses
        </button>
        <button className="px-3 py-1 mr-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400">
          Active Courses
        </button>
        <button className="px-3 py-1 text-gray-700 bg-gray-300 rounded hover:bg-gray-400">
          Completed Courses
        </button>
      </div>
      {/* Display enrolled courses */}
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <img
              className="object-cover object-center w-full h-40"
              src={course.thumbnail}
              alt={course.name}
            />
            <div className="px-6 py-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {course.name}
              </h3>
              <p className="mb-2 text-gray-700">
                Total Lessons: {course.totalLessons}
              </p>
              <p className="mb-2 text-gray-700">
                Completed Lessons: {course.completedLessons}
              </p>
              <div className="h-4 mb-2 overflow-hidden bg-gray-200 rounded-lg">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="mb-2 text-gray-700">{course.progress}% Completed</p>
              <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
