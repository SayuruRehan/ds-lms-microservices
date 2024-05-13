import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/5660740.jpg";

function EditCourseForm() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    CourseName: "",
    instructor: "",
    description: "",
    duration: "",
    level: "",
    price: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4003/api/v1/course/get/${courseId}`
      );
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Error fetching course. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4003/api/v1/course/update/${courseId}`,
        course
      );
      alert("Course updated successfully");
    } catch (error) {
      console.error("Error updating course:", error);
      setError("Error updating course. Please try again later.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Apply background image
    >
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Edit Course
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="CourseName" className="block font-medium">
                Course Name
              </label>
              <input
                type="text"
                id="CourseName"
                name="CourseName"
                value={course.CourseName}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="instructor" className="block font-medium">
                Instructor
              </label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={course.instructor}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleChange}
                rows="4"
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block font-medium">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="level" className="block font-medium">
                Level
              </label>
              <input
                type="text"
                id="level"
                name="level"
                value={course.level}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="price" className="block font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={course.price}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update Course
            </button>
          </form>

          <div className="h-4"></div>
        </div>
      </div>
    </div>
  );
}

export default EditCourseForm;
