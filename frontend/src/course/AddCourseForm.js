import React, { useState } from "react";
import axios from "axios";

const AddCourseForm = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    instructor: "",
    description: "",
    duration: "",
    level: "",
    price: 0,
    lectureNotes: null,
    InstructorId: "",
    lectureVideos: null,
    preview: null,
    lessons: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData({ ...courseData, [e.target.name]: file });
  };

  const handleLessonChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLessons = [...courseData.lessons];
    updatedLessons[index][name] = value;
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(courseData).forEach((key) => {
        if (key === "lessons") {
          formData.append(key, JSON.stringify(courseData[key]));
        } else {
          formData.append(key, courseData[key]);
        }
      });

      await axios.post("http://localhost:4003/api/v1/course/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCourseData({
        title: "",
        instructor: "",
        description: "",
        duration: "",
        level: "",
        price: 0,
        lectureNotes: null,
        InstructorId: "",
        lectureVideos: null,
        preview: null,
        lessons: [
          { title: "", description: "" },
          { title: "", description: "" },
          { title: "", description: "" },
        ],
      });

      alert("Course added successfully!");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Course Title"
        />
        <input
          type="text"
          name="instructor"
          value={courseData.instructor}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Instructor Name"
        />
        <textarea
          name="description"
          value={courseData.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Course Description"
        />
        <input
          type="text"
          name="duration"
          value={courseData.duration}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Duration"
        />
        <input
          type="text"
          name="level"
          value={courseData.level}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Level"
        />
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Price"
        />
        <input
          type="file"
          name="lectureNotes"
          onChange={handleFileChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="InstructorId"
          value={courseData.InstructorId}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="InstructorId"
        />
        <input
          type="file"
          name="lectureVideos"
          onChange={handleFileChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="file"
          name="preview"
          onChange={handleFileChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        <h3 className="text-xl font-semibold mb-2">Lessons</h3>
        {courseData.lessons.map((lesson, index) => (
          <div key={index}>
            <h4 className="text-lg font-semibold">Lesson {index + 1}</h4>
            <input
              type="text"
              name="title"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, e)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Lesson Title"
            />
            <textarea
              name="description"
              value={lesson.description}
              onChange={(e) => handleLessonChange(index, e)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Lesson Description"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
