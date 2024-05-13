import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [activeTab, setActiveTab] = useState("approved"); // State to track active tab
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to control the visibility of the confirmation modal
  const [courseToDelete, setCourseToDelete] = useState(null); // State to store the course to delete
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchCourses();
  }, [activeTab]); // Fetch courses when the active tab changes

  const fetchCourses = async () => {
    try {
      let response;
      if (activeTab === "approved") {
        response = await axios.get(
          "http://localhost:4003/api/v1/course/getApproved"
        );
      } else if (activeTab === "pending") {
        response = await axios.get(
          "http://localhost:4003/api/v1/course/getPending"
        );
      } else if (activeTab === "rejected") {
        response = await axios.get(
          "http://localhost:4003/api/v1/course/getRejected"
        );
      }
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses. Please try again later.");
    }
  };

  const handleViewDetails = (courseId) => {
    setExpandedCourseId(courseId === expandedCourseId ? null : courseId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEdit = (courseId) => {
    // Navigate to the edit page with courseId as a parameter
    navigate(`/edit/${courseId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:4003/api/v1/course/delete/${courseToDelete}`
      );
      // After successful deletion, fetch the updated course list
      fetchCourses();
      // Close the confirmation modal
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Error deleting course. Please try again later.");
    }
  };

  const handleShowConfirmationModal = (courseId) => {
    // Set the course to delete and show the confirmation modal
    setCourseToDelete(courseId);
    setShowConfirmationModal(true);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Course List</h1>

      {/* Add Course Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => navigate("/addCourse")}
      >
        Add Course
      </button>
      {/* Tab navigation */}
      <div className="flex mb-4">
        <button
          onClick={() => handleTabChange("approved")}
          className={`mr-4 ${
            activeTab === "approved" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Approved Courses
        </button>
        <button
          onClick={() => handleTabChange("pending")}
          className={`mr-4 ${
            activeTab === "pending" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Pending Courses
        </button>
        <button
          onClick={() => handleTabChange("rejected")}
          className={`mr-4 ${
            activeTab === "rejected" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Rejected Courses
        </button>
      </div>
      {/* Course list */}
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
                  {activeTab === "pending" && (
                    <button
                      onClick={() => handleEdit(course._id)}
                      className="text-green-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleShowConfirmationModal(course._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
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
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this course?"
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default CourseList;
