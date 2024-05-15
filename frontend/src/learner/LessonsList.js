import React, { useState, useEffect } from "react";

const LessonsList = ({ lessons, lessonsCompleted }) => {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [alertSuccess, setAlertSuccess] = useState("");

  useEffect(() => {
    const initialCompletedLessons = lessonsCompleted.map(
      (lesson) => lesson.lessonId
    );
    setCompletedLessons(initialCompletedLessons);
    const newProgress = (initialCompletedLessons.length / lessons.length) * 100;
    setProgress(newProgress);
  }, [lessonsCompleted, lessons]);

  // handle lesson completion
  const handleLessonCompletion = (lessonId, completed) => {
    if (completed) {
      setCompletedLessons((prevCompletedLessons) => [
        ...prevCompletedLessons,
        lessonId,
      ]);
      setAlertSuccess("Lesson completion status updated successfully.");
    } else {
      setCompletedLessons((prevCompletedLessons) =>
        prevCompletedLessons.filter((id) => id !== lessonId)
      );
      setAlertSuccess("Lesson completion status updated successfully.");
    }
  };

  useEffect(() => {
    const newProgress = (completedLessons.length / lessons.length) * 100;
    setProgress(newProgress);
  }, [completedLessons, lessons]);

  return (
    <div className="flex-1">
      {alertSuccess && (
        <div className="p-3 mb-4 text-green-800 bg-green-200 rounded">
          {alertSuccess}
        </div>
      )}

      <div className="h-4 mb-2 overflow-hidden bg-gray-200 ">
        <div
          className="h-full bg-green-700 progressBar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mb-2 text-gray-700 progressValue">
        {progress.toFixed(2)}% Completed
      </p>
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded shadow"
          >
            <div>
              <h3 className="mb-2 text-lg font-semibold">{`Lesson ${
                index + 1
              }: ${lesson.title}`}</h3>
              <p className="text-gray-700">{lesson.description}</p>
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
