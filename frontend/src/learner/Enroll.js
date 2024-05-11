import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EnrollBackground from "../assets/enroll.jpg";
import HeroCover from "./HeroCover";
import NavBar from "./NavBar";
import Time from "../assets/time.png";
import Level from "../assets/level.png";
import LessonsIcon from "../assets/lessonsIcon.jpg";

const Enroll = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const learnerId = "123f55396a149b001f8a1234";
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4003/api/v1/course/get/`
        );

        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchAllCourses();
  }, []);

  const handleEnroll = (course) => {
    localStorage.setItem("courseData", JSON.stringify(course));
  };

  const proceedToPayment = (course) => {
    localStorage.setItem("courseData", JSON.stringify(course));
  };

  return (
    <div className="container px-4 mx-auto">
      <div
        className="relative inset-0 z-0 bg-center bg-cover"
        style={{ height: "50vh" }}
      >
        <div
          className="absolute inset-0 z-0 bg-gray-800"
          //   style={{ backgroundImage: `url(${EnrollBackground})` }}
        >
          <NavBar />
          {/* <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          src={Hero}
        /> */}
        </div>
        <header className="absolute px-10 mb-2 top-10 md:top-52">
          <div className="items-start justify-center text-center">
            <h2 className="text-lg font-bold text-white md:text-4xl">
              Top Courses
            </h2>
          </div>
        </header>
      </div>

      {/* Display enrolled courses */}
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <img
              className="object-cover object-center w-full h-40"
              src={course.preview}
              alt={course.CourseName}
            />

            <div className="flex flex-col px-6 py-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {course.CourseName}
              </h3>

              <div className="flex flex-row items-center justify-around">
                <div className="flex flex-row justify-center iems-center">
                  {/* icon */}
                  <image src={Level} className="w-2" />
                  <p>{course.level}</p>
                </div>
                <div className="">
                  {/* icon */}
                  <image src={LessonsIcon} />
                  <p>{course.lessons.length}</p>
                </div>
                <div className="">
                  {/* icon */}
                  <image src={Time} />
                  <p>{course.duration}</p>
                </div>
              </div>

              <div className="flex flex-row justify-around item-center ">
                <p className="text-xl font-bold text-stone-900 ">Rs.{course.price}/=</p>
                <Link
                  to={`/courses/${course._courseId}`}
                  onClick={() => handleEnroll(course)}
                  className="items-center justify-center block px-4 py-2 font-bold text-center text-gray-800 bg-gray-200 rounded tex-center hover:bg-gray-800 focus:outline-none focus:shadow-outline border-gray-950 hover:text-gray-200"
                >
                  Enroll me
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enroll;
