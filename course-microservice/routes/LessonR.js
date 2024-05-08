const express = require("express");
const router = express.Router();
const Course = require("../models/courseModel");

// POST route to add lessons to a course
router.post("/courses/:id/lessons", async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Add the lesson to the lessons array of the course
    course.lessons.push({ title, description });

    // Save the course with the new lesson
    await course.save();

    res.status(201).json({ message: "Lesson added to the course successfully", course });
  } catch (error) {
    console.error("Error adding lesson to course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
