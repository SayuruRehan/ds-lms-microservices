import React, { useState, useEffect } from "react";
import axios from "axios";

const LearnerProgress = ({ learnerId }) => {
  const [courseProgress, setCourseProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const learnerId = "123f55396a149b001f8a1234";
        const response = await axios.get(
          `http://localhost:4002/progress/${learnerId}`
        );
        const progressData = response.data;

        // Fetch course details for each course
        const courseDetailsPromises = progressData.map((course) =>
          axios.get(
            `http://localhost:4003/api/v1/course/get/${course.courseId}`
          )
        );
        const courseDetailsResponses = await Promise.all(courseDetailsPromises);
        const courseDetails = courseDetailsResponses.map(
          (response) => response.data
        );

        // Combine progress data with course details
        const combinedData = progressData.map((course, index) => ({
          ...course,
          ...courseDetails[index],
        }));

        setCourseProgress(combinedData);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [learnerId]);

  return (
    <div className="container px-10 py-8 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold">My Progress</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courseProgress.map((course, index) => (
          <div key={index} className="border rounded shadow">
            <div className="flex flex-col justify-between h-full p-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  {course.CourseName}
                </h3>
                <p className="mb-4 text-gray-600">{course.description}</p>
                <div className="flex items-center mb-4">
                  <div className="w-32 h-4 bg-gray-200 rounded">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-gray-600">
                    {course.progress.toFixed(2)}%
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">Lessons:</h4>
                  <ul className="pl-5 list-disc">
                    {course.lessons.map((lesson, index) => (
                      <li key={index}>{lesson.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerProgress;
