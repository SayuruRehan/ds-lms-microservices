import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditCourseForm() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    CourseName: "",
    instructor: "",
    description: "",
    duration: "",
    level: "",
    price: "",
    preview: "",
    lessons: [],
    lectureNotes: "",
    lectureVideos: "",
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
      // Handle success, maybe show a success message or redirect
      console.log("Course updated successfully");
    } catch (error) {
      console.error("Error updating course:", error);
      // Handle error, maybe show an error message to the user
      setError("Error updating course. Please try again later.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for editing course details */}
        <div className="mb-4">
          <label htmlFor="CourseName" className="block font-medium">
            Course Name
          </label>
          <input
            type="text"
            id="CourseName"
            name="CourseName"
            value={course.CourseName}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 mt-1 w-full"
          />
        </div>
        {/* Repeat similar pattern for other fields */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}

export default EditCourseForm;
