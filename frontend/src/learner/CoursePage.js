import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LessonsList from "./LessonsList";
import Progress from "./Progress";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/arrowLeft.png";
import Resources from "./Resources";
// import lectureVideos from "../../../course-microservice/"

const CoursePage = () => {
  const course = JSON.parse(localStorage.getItem("courseData"));
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  console.log(course.preview);
  const path = `../../../course-microservice/${course.preview.replace(
    /\\/g,
    "/"
  )}`;
  console.log(path);

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

      toast.success("You unenrolled successfully"); // Success toast

      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error unenrolling:", error);
      toast.error("Error unenrolling"); // Error toast
    }
  };

  const handleNavigation = async () => {
    navigate(`/enrolledCourses`);
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-row-reverse justify-center w-full max-w-full px-20 py-10 rounded-lg shadow-md gap-28 bg-slate-100">
        <div>
          <h1 className="mb-4 text-3xl font-semibold">{course.CourseName}</h1>
          <p className="mb-6 text-gray-400">{course.description}</p>
        </div>
        {/* Video Area */}
        <div className="mb-6 h-9">
          <img
            src={`../../../course-microservice/${course.preview.replace(
              /\\/g,
              "/"
            )}`}
            alt="Course Preview"
          />
          {/* <video src={course.videoUrl} className="object-cover" controls /> */}
        </div>
      </div>

      <div className="flex flex-row items-start justify-start w-full px-10 mt-8 mt-10">
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
        <div className="flex flex-col w-1/4 px-4 py-8">
          <button
            onClick={handleUnenroll}
            className="w-full px-4 py-2 text-white bg-red-500 rounded shadow-lg hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Unenroll
          </button>
          <Progress progress={course.progress} course={course} />
          <Resources
            lectureNotes={course.lectureNotes}
            lectureVideos={course.lectureVideos}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursePage;
