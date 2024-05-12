import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EnrollBackground from "../assets/enroll.jpg";
import HeroCover from "./HeroCover";
import NavBar from "./NavBar";
import { GiProgression } from "react-icons/gi";
import { IoTime } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";

const Enroll = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

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

  const handleEnroll = async (course) => {
    // localStorage.setItem("courseData", JSON.stringify(course));

    console.log(course._id);
    const learnerId = "123f55396a149b001f8a1234";
    try {
      const response = await axios.post(
        `http://localhost:4002/learner/course/enroll?courseId=${course._id}`,
        { learnerId }
      );
      console.log(response.data.message);
      // Redirect to Success.js after successful enrollment
      if (response.status === 200) {
        navigate("/enroll/success");
      } else {
        navigate("/enroll/unsuccess");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      // Handle error
    }
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
        </div>
        <header className="absolute px-10 mb-2 top-10 md:top-52">
          <div className="items-start justify-center text-center">
            <h2 className="text-lg font-bold text-white md:text-4xl">
              Featured Courses
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
              className="object-cover object-center shadow-lg w-full h-40"
              src={`http://localhost:4003/${course.preview.replace("\\", "/")}`}
              alt={course.CourseName}
            />

            <div className="flex flex-col px-2 py-4">
              <div className="mb-2 ">
                <h3 className="text-xl font-semibold text-gray-900">
                  {course.CourseName}
                </h3>
              </div>

              <div className="flex flex-row  ">
                <div className="flex flex-row flex-1 justify-left gap-1 ">
                  <GiProgression />
                  <p className="">{course.level}</p>
                </div>
                <div className="flex flex-row  flex-1 gap-1 justify-left">
                  <FaBookReader />
                  <p>{course.lessons.length}</p>lessons
                </div>
                <div className="flex flex-row justify-left gap-1  flex-1">
                  <IoTime />
                  <p>{course.duration}</p>
                </div>
              </div>

              <div className="flex flex-row justify-around gap-1  item-center ">
                <div className="flex flex-row justify-centeritems-center p-0">
                  <p className="text-xl font-bold text-stone-900 ">
                    Rs.{course.price}/=
                  </p>
                </div>
                <div>
                  <Link
                    // to={`/courses/${course._courseId}`}
                    onClick={() => handleEnroll(course)}
                    className="items-center justify-center block px-4 py-2 font-bold text-center text-gray-800 bg-gray-200 rounded tex-center hover:bg-gray-800 focus:outline-none focus:shadow-outline border-2 border-gray-950 hover:text-gray-100"
                  >
                    Enroll me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enroll;
