// backend/routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Create a new course
router.post("/add", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a course by ID
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "lectureNotes",
    "videos",
    "quizzes",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a course by ID
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
