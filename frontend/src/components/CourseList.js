import React, { useState, useEffect } from "react";
import axios from "axios"; // You may need to install axios: npm install axios

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4003/api/v1/course");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p>
              <strong>Description:</strong> {course.description}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <p>
              <strong>Level:</strong> {course.level}
            </p>
            <p>
              <strong>Price:</strong> ${course.price}
            </p>
            <p>
              <strong>Lecture Notes:</strong>
            </p>
            <ul>
              <li>Title: {course.lectureNotes.title}</li>
              <li>Description: {course.lectureNotes.description}</li>
              {course.lectureNotes.file && (
                <>
                  {course.lectureNotes.file.contentType ===
                    "application/pdf" && (
                    <li>
                      <a
                        href={`data:${
                          course.lectureNotes.file.contentType
                        };base64,${Buffer.from(
                          course.lectureNotes.file.data
                        ).toString("base64")}`}
                        download
                      >
                        Download PDF
                      </a>
                    </li>
                  )}
                </>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
