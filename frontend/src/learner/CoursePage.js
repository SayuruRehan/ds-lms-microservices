import React, { useState } from "react";
import axios from "axios";
import LessonsList from "./LessonsList";
import Progress from "./Progress";

const CoursePage = () => {
  const course = JSON.parse(localStorage.getItem("courseData"));
  const [lessons, setLessons] = useState([]);

  //   const handleLessonCompletion = (index) => {
  //     const updatedLessons = [...course.lessons];
  //     updatedLessons[index].completed = !updatedLessons[index].completed;
  //     setLessons(updatedLessons);
  //   };

  const handleUnenroll = async () => {
    try {
      const learnerId = "123f55396a149b001f8a1234"; // Replace with actual learner id
      const courseId = course.courseId;

      const response = await axios.post("/course/unenroll", {
        learnerId,
        courseId,
      });

      console.log(response.data.message); // Log success message

      // Optionally, you can redirect to another page or perform any additional action upon unenrollment
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  return (
    <div className="container px-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">{course.CourseName}</h1>
      {/* <button
          onClick={handleUnenroll}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
        >
          Unenroll
        </button> */}
      <div className="flex flex-auto">
        <LessonsList lessons={course.lessons} />
        <div>
          <button
            onClick={handleUnenroll}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Unenroll
          </button>
          <Progress progress={course.progress} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
