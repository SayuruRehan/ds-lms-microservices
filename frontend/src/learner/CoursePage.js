import React from "react";
import { useLocation } from "react-router-dom";
import LessonsList from "./LessonsList";
import Progress from "./Progress";

const CoursePage = () => {
  const location = useLocation();
  const { course } = location.state || {}; // Add a null check here
  
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">{course.name}</h1>
      <div className="flex flex-row">
        <LessonsList lessons={course.lessonsCompleted} />
        <Progress progress={course.progress} />
      </div>
    </div>
  );
};

export default CoursePage;
