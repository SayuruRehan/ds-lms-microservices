import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cover from "../assets/Cover1.png";
import HeroCover from "./HeroCover";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("enrolled");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const learnerId = "123f55396a149b001f8a1234";

        const response = await axios.get(
          `http://localhost:4002/learner/enrollments/${learnerId}`
        );
        console.log(response.data.enrolledCourses);

        const enrolledCourses = response.data.enrolledCourses;
        const courseDetailsPromises = enrolledCourses.map((course) => {
          console.log("Waiting for course api response");
          console.log(course._id);
          return axios.get(
            `http://localhost:4003/api/v1/course/get/${course.courseId}`
          );
        });

        const courseDetailsResponses = await Promise.all(courseDetailsPromises);
        // const combinedCourses = enrolledCourses;
        const combinedCourses = enrolledCourses.map((course, index) => {
          const courseDetails = courseDetailsResponses[index].data;
          const previewPath = courseDetails.preview.replace(/\\/g, "/");
          const lessonsCompleted = course.lessonsCompleted;
          const lectureVideosPath = courseDetails.lectureVideos.replace(
            /\\/g,
            "/"
          );
          console.log(previewPath);
          return {
            ...course,
            courseId: courseDetails._id,
            preview: `../../../course-microservice/${previewPath}`,
            totalLessons: courseDetails.totalLessons,
            InstructorId: courseDetails.InstructorId,
            CourseName: courseDetails.CourseName,
            description: courseDetails.description,
            duration: courseDetails.duration,
            level: courseDetails.level,
            price: courseDetails.price,
            lectureNotes: courseDetails.lectureNotes,
            lectureVideos: courseDetails.lectureVideos,
            status: courseDetails.lectureVideos,
            status: courseDetails.status,
            preview: courseDetails.preview,
            lessons: courseDetails.lessons,
            lessonsCompleted: lessonsCompleted,
          };
        });

        setCourses(combinedCourses);
        console.log(courses);
        filterCourses("enrolled"); // Set initial filtered courses to all enrolled courses
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleContinueLearning = (course) => {
    localStorage.setItem("courseData", JSON.stringify(course));
  };

  const filterCourses = (tab) => {
    if (tab === "enrolled") {
      setFilteredCourses(courses);
    } else if (tab === "active") {
      setFilteredCourses(
        courses.filter(
          (course) => course.lessonsCompleted.length < course.totalLessons
        )
      );
    } else if (tab === "completed") {
      setFilteredCourses(
        courses.filter(
          (course) => course.lessonsCompleted.length === course.totalLessons
        )
      );
    }
  };

  useEffect(() => {
    filterCourses(activeTab);
  }, [activeTab, courses]);

  return (
    <div className="container px-4 mx-auto">
      <HeroCover />

      <div
        className="flex justify-center gap-4 bg-green-950"
        // style={{ backgroundImage: `url(${Cover})` }}
      >
        <button
          className={`px-3 py-1 mr-2 text-white ${
            activeTab === "enrolled"
              ? "bg-green-700 rounded-lg"
              : "hover:bg-green-800 rounded-lg"
          }`}
          // style={{borderBottom:"5px solid #8f0d47"}}
          onClick={() => setActiveTab("enrolled")}
        >
          All Courses
        </button>
        <button
          className={`px-3 py-3 mr-2 text-white ${
            activeTab === "active"
              ? "bg-green-700 rounded-lg"
              : "hover:bg-green-800 rounded-lg"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Courses
        </button>
        <button
          className={`px-3 py-1 text-white rounded ${
            activeTab === "completed"
              ? "bg-green-700 rounded-lg"
              : "hover:bg-green-800 rounded-lg"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Courses
        </button>
      </div>

      {/* Display enrolled courses */}
      <div className="flex justify-end py-6 pr-6">
        <Link
          to="/myProgress"
          className="px-10 py-2 font-medium text-white rounded-md bg-green-950 text-md hover:bg-green-800"
        >
          View My Progress
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 px-8 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCourses.map((course) => (
          <div
            key={course.courseId}
            className="overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <img
              className="object-cover object-center w-full h-40"
              src={`http://localhost:4003/${course.preview.replace("\\", "/")}`}
              alt={course.CourseName}
            />

            <div className="px-6 py-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {course.CourseName}
              </h3>
              <p className="mb-2 text-gray-700">
                Total Lessons: {course.totalLessons}
              </p>
              <p className="mb-2 text-gray-700">
                Completed Lessons: {course.lessonsCompleted.length}
              </p>
              {/* <div className="h-2 mb-2 overflow-hidden bg-gray-200 rounded-lg">
                <div
                  className="h-full bg-green-700"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="mb-2 text-gray-700">{course.progress}% Completed</p> */}

              <Link
                to={`/courses/${course.courseId}`}
                onClick={() => handleContinueLearning(course)}
                className="block px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-950 focus:outline-none focus:shadow-outline"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
