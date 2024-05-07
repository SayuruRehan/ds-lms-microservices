const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const path = require("path");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Lectures"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    cb(null, `${fileName}-${Date.now()}${ext}`); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

// Create a new course with file upload
router.post("/add", upload.single("lectureNotes"), async (req, res) => {
  try {
    const courseData = req.body;
    // Append the file path to the course data
    courseData.lectureNotes = req.file.path;

    const course = new Course(courseData);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to retrieve all courses
router.get("/get", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching courses" });
  }
});
module.exports = router;
