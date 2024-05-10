import React from "react";

const Progress = ({ progress }) => {
  return (
    <div className="flex-1 pl-8">
      <h2 className="mb-4 text-lg font-semibold">Progress</h2>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 mr-4 bg-blue-500 rounded-full"></div>
        <div>
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{progress}% Completed</p>
    </div>
  );
};

export default Progress;
