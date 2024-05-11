import React, { useState } from "react";
import axios from "axios";
import LessonsList from "./LessonsList";
import Progress from "./Progress";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/arrowLeft.png";

const CoursePage = () => {
  const course = JSON.parse(localStorage.getItem("courseData"));
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const handleUnenroll = async () => {
    try {
      const learnerId = "123f55396a149b001f8a1234";
      const courseId = course.courseId;

      const response = await axios.post(
        "http://localhost:4002/learner/course/unenroll",
        {
          learnerId,
          courseId,
        }
      );

      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  const handleNavigation = async () => {
    navigate(`/enrolledCourses`);
  };

  return (
    <div className="container flex-flex-col">
      <div
        className="flex max-w-full min-h-screen-1/2 hero"
        style={{ backgroundColor: "#3E54AC" }}
      >
        <div
          className="justify-center w-full max-w-full bg-blue-300 rounded-lg shadow-md"
          style={{ backgroundColor: "#3E54AC" }}
        >
          <h1 className="mb-4 text-3xl font-semibold">{course.CourseName}</h1>
          <p className="mb-6 text-gray-400">{course.description}</p>
          {/* Video Area */}
          <div className="mb-6 aspect-w-16 aspect-h-9">
            {/* Insert your video component here */}
            <video src={course.videoUrl} className="object-cover" controls />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start w-full px-10 mt-8">
        <div className="w-3/4 py-4">
          <div className="flex flex-row">
            <img className="w-6 h-5 " src={arrowIcon} />
            <button
              onClick={handleNavigation}
              className="w-full px-4 py-2 text-blue-600 hover:text-red-500 focus:outline-none focus:shadow-outline"
            >
              Back to Enrollments
            </button>
          </div>
          <h2 className="mb-4 text-2xl font-semibold">Chapters</h2>
          <LessonsList lessons={course.lessons} />
        </div>
        <div className="flex flex-col items-center w-1/4">
          <button
            onClick={handleUnenroll}
            className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Unenroll
          </button>
          <Progress progress={course.progress} course={course} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursePage;
