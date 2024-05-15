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
import { GiProgression } from "react-icons/gi";
import { IoTime } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
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

      alert("You unenrolled successfully"); // Success alert

      // Make request to local notification microservice

      await axios.post(
        "http://localhost:4005/api/v1/notification/add",
        {
          title: "Successfull Unenrollment",
          message: "You are successfuly unenrolled from the course",
          role: "admin",
        },
        {
          headers: {
            Authorization:
              "Key here", // Replace with your SendGrid API key
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/enrolledCourses");
      console.log(response.data.message); // Log success message
    } catch (error) {
      // console.error("Error unenrolling:", error);
      //alert("Error unenrolling"); // Error alert
    }
  };

  const handleNavigation = async () => {
    navigate(`/enrolledCourses`);
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-row justify-center object-cover w-full max-w-full px-20 py-20 rounded-lg shadow-md max-h-80 gap-28 bg-slate-200">
        <div className="mb-6 h-9 w-96">
          <img
            src={`http://localhost:4003/${course.preview.replace("\\", "/")}`}
            alt="Course Preview"
          />
          {/* <video src={course.videoUrl} className="object-cover" controls /> */}
        </div>
        <div>
          <div>
            <h1 className="mb-4 text-5xl font-semibold">{course.CourseName}</h1>
            <p className="mb-6 text-xl text-gray-600">{course.description}</p>
          </div>

          <div className="flex flex-row items-center justify-center px-10 pt-4 pb-2 border-2 rounded-lg bg-slate-100">
            <div className="flex flex-row justify-center flex-1 gap-2 ">
              <GiProgression />
              <p className="">{course.level}</p>
            </div>
            <div className="flex flex-row justify-center flex-1 gap-2">
              <FaBookReader />
              <p>{course.lessons.length}</p>lessons
            </div>
            <div className="flex flex-row justify-center flex-1 gap-2">
              <IoTime />
              <p>{course.duration}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start justify-start w-full px-10 mt-3">
        <div className="w-3/4 py-4">
          <div className="flex flex-row">
            <button
              onClick={handleNavigation}
              className="flex flex-row justify-around w-1/4 px-4 py-2 rounded-xl hover:bg-green-950 hover:text-slate-100 hover:boder-2 hover:boder-slate-200 border-slate-900 text-slate-100 bg-slate-800 focus:outline-none focus:shadow-outline "
            >
              <FaLongArrowAltLeft />
              Back to Enrollments
            </button>
          </div>
          <h2 className="mt-8 mb-4 text-2xl font-semibold ">Chapters</h2>
          <LessonsList
            lessons={course.lessons}
            courseId={course._id}
            lessonsCompleted={course.lessonsCompleted}
          />
        </div>
        <div className="flex flex-col w-1/4 px-4 py-4">
          <button
            onClick={handleUnenroll}
            className="w-full px-4 py-2 text-white bg-red-500 rounded shadow-lg hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Unenroll
          </button>
          {/* <Progress progress={course.progress} course={course} /> */}
          <Resources
            lectureNotes={course.lectureNotes}
            lectureVideos={course.lectureVideos}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
