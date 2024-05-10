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

import React from "react";
import { useLocation } from "react-router-dom";
import LessonsList from "./LessonsList";
import Progress from "./Progress";

const CoursePage = () => {
  //   const location = useLocation();
  //   const { course } = location.state;

  const course = JSON.parse(localStorage.getItem("courseData"));
  
  return (
    <div className="container px-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">{course.name}</h1>
      <div className="flex">
        <LessonsList lessons={course.lessonsCompleted} />
        <Progress progress={course.progress} />
      </div>
    </div>
  );
};

export default CoursePage;
