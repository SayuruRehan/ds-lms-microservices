import React from "react";
import { Link } from "react-router-dom";

const LessonsList = ({ lessons, handleLessonCompletion }) => {
  return (
    <div className="flex-1 pr-8">
      <h2 className="mb-4 text-lg font-semibold">Lessons</h2>
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white rounded shadow">
            <div>
              <h3 className="mb-2 text-lg font-semibold">{lesson.title}</h3>
              <p className="text-gray-700">{lesson.description}</p>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-500 form-checkbox"
                  checked={lesson.completed}
                  onChange={() => handleLessonCompletion(index)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;

// using data file
// import React from "react";
// import lessonsData from "./DataFiles/lessonsData";

// const LessonsList = () => {
//   return (
//     <div className="flex-1 pr-8">
//       <h2 className="mb-4 text-lg font-semibold">Lessons</h2>
//       <div className="space-y-4">
//         {lessonsData.map((lesson, index) => (
//           <div key={index} className="p-4 bg-white rounded shadow">
//             <h3 className="mb-2 text-lg font-semibold">{lesson.title}</h3>
//             <p className="text-gray-700">{lesson.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LessonsList;
