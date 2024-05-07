import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Fetch courses data from the server
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
    }
  };

  const handleApprove = async (courseId) => {
    try {
      // Send a request to approve the course
      await axios.post(`http://localhost:4003/api/course/approve/${courseId}`);
      // Update the status of the approved course locally
      updateCourseStatus(courseId, "approved");
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const handleReject = async (courseId) => {
    try {
      // Send a request to reject the course
      await axios.post(`http://localhost:4003/api/course/reject/${courseId}`);
      // Update the status of the rejected course locally
      updateCourseStatus(courseId, "rejected");
    } catch (error) {
      console.error("Error rejecting course:", error);
    }
  };

  const updateCourseStatus = (courseId, status) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId ? { ...course, status } : course
      )
    );
  };

  const filterCourses = (status) => {
    return courses.filter((course) => course.status === status);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`text-gray-600 py-4 px-6 block focus:outline-none ${
              value === 0 ? "border-b-2 border-blue-500 font-semibold" : ""
            }`}
            onClick={() => setValue(0)}
          >
            Pending Courses
          </button>
          <button
            className={`text-gray-600 py-4 px-6 block focus:outline-none ${
              value === 1 ? "border-b-2 border-blue-500 font-semibold" : ""
            }`}
            onClick={() => setValue(1)}
          >
            Approved Courses
          </button>
          <button
            className={`text-gray-600 py-4 px-6 block focus:outline-none ${
              value === 2 ? "border-b-2 border-blue-500 font-semibold" : ""
            }`}
            onClick={() => setValue(2)}
          >
            Rejected Courses
          </button>
        </nav>
      </div>
      <div className="mt-8">
        {value === 0 && (
          <CoursesList
            courses={filterCourses("pending")}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        )}
        {value === 1 && <CoursesList courses={filterCourses("approved")} />}
        {value === 2 && <CoursesList courses={filterCourses("rejected")} />}
      </div>
    </div>
  );
};

const CoursesList = ({ courses, handleApprove, handleReject }) => {
  return (
    <div>
      {courses.map((course) => (
        <div
          key={course._id}
          className="border-b border-gray-200 py-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-gray-500">{course.description}</p>
          </div>
          {(handleApprove || handleReject) && (
            <div className="space-x-4">
              {handleApprove && (
                <button
                  onClick={() => handleApprove(course._id)}
                  className="text-green-500 focus:outline-none"
                >
                  Approve
                </button>
              )}
              {handleReject && (
                <button
                  onClick={() => handleReject(course._id)}
                  className="text-red-500 focus:outline-none"
                >
                  Reject
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
