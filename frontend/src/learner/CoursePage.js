// import React from "react";
// import { useLocation } from "react-router-dom";
// import LessonsList from "./LessonsList";
// import Progress from "./Progress";

// const CoursePage = () => {
//   return (
//     <div className="container px-4 mx-auto">
//       <h1 className="mb-4 text-3xl font-semibold">Introduction to IP</h1>
//       <div className="flex flex-row">
//         <LessonsList/>
//         <Progress/>
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

import React, { useState } from "react";
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


  return (
    <div className="container px-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">{course.CourseName}</h1>
      <div className="flex flex-auto">
        <LessonsList
          lessons={course.lessons}
        />
        <Progress progress={course.progress} />
      </div>
    </div>
  );
};

export default CoursePage;
