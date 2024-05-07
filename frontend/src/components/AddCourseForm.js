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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4003/api/v1/course/add", courseData);
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
        <label className="block">
          Title:
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <label className="block">
          Instructor:
          <input
            type="text"
            name="instructor"
            value={courseData.instructor}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <label className="block">
          Description:
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <label className="block">
          Duration:
          <input
            type="text"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <label className="block">
          Level:
          <select
            name="level"
            value={courseData.level}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
        <label className="block">
          Price:
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
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
