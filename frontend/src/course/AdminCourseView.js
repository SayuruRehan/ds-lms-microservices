import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminCourseView() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [courseToApprove, setCourseToApprove] = useState(null);
  const [courseToReject, setCourseToReject] = useState(null);

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

  const handleApproveCourse = async (courseId) => {
    setShowConfirmationModal(true);
    setCourseToApprove(courseId);
  };

  const handleRejectCourse = async (courseId) => {
    setShowConfirmationModal(true);
    setCourseToReject(courseId);
  };

  const confirmApproveCourse = async () => {
    try {
      await axios.post(
        `http://localhost:4003/api/v1/course/approve/${courseToApprove}`
      );
      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course._id === courseToApprove) {
            return { ...course, status: "approved" };
          }
          return course;
        })
      );
      alert("Course has been approved successfully.");
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error approving course:", error);
      setError("Error approving course. Please try again later.");
    }
  };

  const confirmRejectCourse = async () => {
    try {
      await axios.post(
        `http://localhost:4003/api/v1/course/reject/${courseToReject}`
      );
      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course._id === courseToReject) {
            return { ...course, status: "rejected" };
          }
          return course;
        })
      );
      alert("Course has been rejected.");
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error rejecting course:", error);
      setError("Error rejecting course. Please try again later.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
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
                  <h3 className="text-lg font-semibold mb-2">Course Details</h3>
                  <p>Description: {course.description}</p>
                  <p>Duration: {course.duration}</p>
                  <p>Level: {course.level}</p>
                  <p>Price: ${course.price}</p>
                  <p>Total Lessons: {course.totalLessons}</p>
                  <ul>
                    {course.lessons.map((lesson, index) => (
                      <li key={index}>
                        <strong>{lesson.title}</strong>: {lesson.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-gray-100 px-6 py-4">
              <button
                onClick={() => handleViewDetails(course._id)}
                className="text-blue-500 hover:underline mr-2"
              >
                {expandedCourseId === course._id
                  ? "Hide Details"
                  : "View Details"}
              </button>
              {!course.approved && (
                <>
                  <button
                    onClick={() => handleApproveCourse(course._id)}
                    className="text-green-500 hover:underline"
                  >
                    {course.status === "approved" ? "Approved" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleRejectCourse(course._id)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    {course.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <p>
              {courseToApprove
                ? "Are you sure you want to approve this course?"
                : "Are you sure you want to reject this course?"}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={
                  courseToApprove ? confirmApproveCourse : confirmRejectCourse
                }
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                {courseToApprove ? "Approve" : "Reject"}
              </button>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCourseView;
