import React from "react";
import { Link } from "react-router-dom";

const LessonsList = ({ lessons }) => {
  return (
    <div className="flex-1 pr-8">
      <h2 className="mb-4 text-lg font-semibold">Lessons</h2>
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div key={index} className="p-4 bg-white rounded shadow">
            <h3 className="mb-2 text-lg font-semibold">{lesson.title}</h3>
            <p className="text-gray-700">{lesson.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
