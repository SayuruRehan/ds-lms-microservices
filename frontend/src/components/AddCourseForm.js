import React, { useState } from "react";
import axios from "axios"; // You may need to install axios: npm install axios

const AddCourseForm = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    instructor: "",
    description: "",
    duration: "",
    level: "",
    price: 0,
    lectureNotes: null,
    InstructorId: "", // Add InstructorId field
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
      formData.append("title", courseData.title);
      formData.append("instructor", courseData.instructor);
      formData.append("description", courseData.description);
      formData.append("duration", courseData.duration);
      formData.append("level", courseData.level);
      formData.append("price", courseData.price);
      formData.append("lectureNotes", courseData.lectureNotes);

      // Append three lessons
      courseData.lessons.forEach((lesson, index) => {
        formData.append(`lessons[${index}][title]`, lesson.title);
        formData.append(`lessons[${index}][description]`, lesson.description);
      });

      // Append InstructorId
      formData.append("InstructorId", courseData.InstructorId);

      // Append lectureVideos and preview if available
      if (courseData.lectureVideos) {
        formData.append("lectureVideos", courseData.lectureVideos);
      }
      if (courseData.preview) {
        formData.append("preview", courseData.preview);
      }

      await axios.post("http://localhost:4003/api/v1/course/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Course added successfully!");
      // Optionally, you can redirect the user to another page or perform any other action here
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields for course details */}
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
        {/* Additional fields */}
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
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="file"
          name="preview"
          onChange={handleFileChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {/* Lessons */}
        <h3 className="text-xl font-semibold mb-2">Lessons</h3>
        {courseData.lessons.map((lesson, index) => (
          <div key={index}>
            <h4 className="text-lg font-semibold">Lesson {index + 1}</h4>
            <input
              type="text"
              name={`lessonTitle${index}`}
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, e)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Lesson Title"
            />
            <textarea
              name={`lessonDescription${index}`}
              value={lesson.description}
              onChange={(e) => handleLessonChange(index, e)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Lesson Description"
            />
          </div>
        ))}
        {/* Submit button */}
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
