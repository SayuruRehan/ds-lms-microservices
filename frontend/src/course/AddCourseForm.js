import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/5660740.jpg";

const AddCourseForm = () => {
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({
    CourseName: "",
    instructor: "",
    description: "",
    duration: "",
    level: "",
    price: 0,
    lectureNotes: null,
    InstructorId: "",
    lectureVideos: null,
    preview: null,
    lessons: [],
  });

  const [numLessons, setNumLessons] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    setCourseData({ ...courseData, [e.target.name]: file });
  };

  const handleLessonTitleChange = (index, e) => {
    const updatedLessons = [...courseData.lessons];
    updatedLessons[index].title = e.target.value;
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

  const handleLessonDescriptionChange = (index, e) => {
    const updatedLessons = [...courseData.lessons];
    updatedLessons[index].description = e.target.value;
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

  const handleNumLessonsChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num) && num >= 0) {
      setNumLessons(num);
      if (num === 0) {
        setCourseData({
          ...courseData,
          lessons: [],
        });
      } else {
        const newLessons = Array.from({ length: num }, () => ({
          title: "",
          description: "",
        }));
        setCourseData({
          ...courseData,
          lessons: newLessons,
        });
      }
    }
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    nextStep();
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

      console.log("FormData:", formData);

      await axios.post("http://localhost:4003/api/v1/course/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Course added successfully!");

      setCourseData({
        CourseName: "",
        instructor: "",
        description: "",
        duration: "",
        level: "",
        price: 0,
        lectureNotes: null,
        InstructorId: "",
        lectureVideos: null,
        preview: null,
        lessons: [],
      });
      setNumLessons(0);
      setStep(1);

      alert("Course added successfully!");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course. Please try again.");
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <div
          className="bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url(${backgroundImage})` }} // Apply background image
        >
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Course - Step 1</h2>
            <form onSubmit={handleSubmitStep1} className="space-y-4">
              <div>
                <label htmlFor="CourseName">Course Title:</label>
                <input
                  type="text"
                  id="CourseName"
                  name="CourseName"
                  value={courseData.CourseName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Course Title"
                />
              </div>
              <div>
                <label htmlFor="instructor">Instructor Name:</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={courseData.instructor}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Instructor Name"
                />
              </div>
              <div>
                <label htmlFor="description">Course Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Course Description"
                />
              </div>
              <div>
                <label htmlFor="duration">Duration:</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Duration"
                />
              </div>
              <div>
                <label htmlFor="level">Level:</label>
                <select
                  id="level"
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
              </div>

              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={courseData.price}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Price"
                />
              </div>
              <div>
                <label htmlFor="lectureNotes">Lecture Notes:</label>
                <input
                  type="file"
                  id="lectureNotes"
                  name="lectureNotes"
                  onChange={handleFileChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="InstructorId">Instructor ID:</label>
                <input
                  type="text"
                  id="InstructorId"
                  name="InstructorId"
                  value={courseData.InstructorId}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Instructor ID"
                />
              </div>
              <div>
                <label htmlFor="lectureVideos">Lecture Videos:</label>
                <input
                  type="file"
                  id="lectureVideos"
                  name="lectureVideos"
                  onChange={handleFileChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="preview">Preview:</label>
                <input
                  type="file"
                  id="preview"
                  name="preview"
                  onChange={handleFileChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="numLessons">Number of Lessons:</label>
                <input
                  type="number"
                  id="numLessons"
                  name="numLessons"
                  value={numLessons}
                  onChange={handleNumLessonsChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Number of Lessons"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      );
    case 2:
      return (
        <div
          className="bg-cover bg-center min-h-screen flex items-center justify-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Course - Step 2</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Lessons</h3>
              {courseData.lessons.map((lesson, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold">Lesson {index + 1}</h4>
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) => handleLessonTitleChange(index, e)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder={`Lesson ${index + 1} Title`}
                  />
                  <textarea
                    value={lesson.description}
                    onChange={(e) => handleLessonDescriptionChange(index, e)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder={`Lesson ${index + 1} Description`}
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white rounded-md py-2 px-4 hover:bg-gray-600 transition duration-300 mr-2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default AddCourseForm;
