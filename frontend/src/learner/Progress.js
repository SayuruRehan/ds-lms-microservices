import React from "react";

const Progress = ({ progress, course }) => {
  return (
    <div className="p-8 mt-16 bg-white rounded-lg shadow-xl ">
      <h2 className="mb-4 text-lg font-semibold">Progress</h2>
      <div className="flex items-center mb-4 w-60">
        <div className="flex flex-grow bg-gray-200">
          <div
            className="h-6 bg-blue-500 "
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-gray-700">{progress}% Completed</p>

    </div>
  );
};

export default Progress;
