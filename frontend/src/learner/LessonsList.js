import React, { useState, useEffect } from "react";

import axios from "axios";

const LessonsList = ({ lessons, courseId }) => {
  const learnerId = "123f55396a149b001f8a1234";
  const [completedLessons, setCompletedLessons] = useState([]);
  const [alertFailed, setAlertFailed] = useState("");
  const [alertSuccess, setAlertSuccess] = useState("");

  console.log(courseId);

  useEffect(() => {
    const fetchCompletedLessons = async () => {
      try {
        // const learnerId = "123f55396a149b001f8a1234";
        const response = await axios.get(
          `http://localhost:4002/learner/enrollments/${learnerId}`
        );

        console.log("------------ " + response);
        console.log("Course ID: " + courseId);
        console.log("Learner ID: " + `${learnerId}`);

        if (response.data && response.data.enrolledCourses) {
          const enrolledCourse = response.data.enrolledCourses.find(
            (course) => course.courseId === courseId
          );
          console.log(enrolledCourse);
          if (enrolledCourse) {
            setCompletedLessons(
              enrolledCourse.lessonsCompleted.map((lesson) => lesson._id)
            );
          }
        } else {
          console.log("enrollments api not give any response");
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };
    fetchCompletedLessons();
  }, []);

  // ----------- handle lesson complete -----------
  const handleLessonCompletion = async (lessonId, completed) => {
    try {
      // Call the API to update lesson completion status
      const response = await axios.post(
        "http://localhost:4002/progress/lesson/complete",
        {
          learnerId,
          courseId,
          lessonId,
          totalLessons: lessons.length,
        }
      );

      console.log(response.data.message);
      // Update completedLessons state
      if (completed) {
        setCompletedLessons([...completedLessons, lessonId]);
      } else {
        setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
      }
      setAlertSuccess("Lesson completion status updated successfully.");
    } catch (error) {
      console.error("Error updating lesson completion:", error);
      setAlertFailed("Failed to update lesson completion status.");
    }
  };

  return (
    <div className="flex-1">
      {alertSuccess && (
        <div className="p-3 mb-4 text-green-800 bg-green-200 rounded">
          {alertSuccess}
        </div>
      )}
      {alertFailed && (
        <div className="p-3 mb-4 text-red-800 bg-red-200 rounded">
          {alertFailed}
        </div>
      )}

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded shadow"
          >
            <div>
              <h3 className="mb-2 text-lg font-semibold">{lesson.title}</h3>
              <p className="text-gray-700">{lesson.description}</p>
              {/* <h4>{lesson.duration}</h4> */}
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-500 form-checkbox"
                  checked={completedLessons.includes(lesson._id)}
                  onChange={() =>
                    handleLessonCompletion(
                      lesson._id,
                      !completedLessons.includes(lesson._id)
                    )
                  }
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
