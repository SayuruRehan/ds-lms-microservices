/* // controllers/courseController.js

const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const path = require("path");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "lectureNotes") {
      cb(null, "../Lectures");
    } else if (file.fieldname === "lectureVideos") {
      cb(null, "../Videos");
    } else if (file.fieldname === "preview") {
      cb(null, "../Preview");
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    cb(null, `${fileName}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

// Serve files stored in the respective folders
router.use(
  "/lectureNotes",
  express.static(path.join(__dirname, "../Lectures"))
);
router.use("/lectureVideos", express.static(path.join(__dirname, "../Videos")));
router.use("/preview", express.static(path.join(__dirname, "../Preview")));

// Function to add a new course
exports.addCourse = async (req, res) => {
    upload.fields([
        { name: "lectureNotes" },
        { name: "lectureVideos" },
        { name: "preview" },
      ])
  try {
    const courseData = req.body;
    const lectureNotes = req.files["lectureNotes"];
    const lectureVideos = req.files["lectureVideos"];
    const preview = req.files["preview"];

    // Process lecture notes
    if (lectureNotes && lectureNotes.length > 0) {
      courseData.lectureNotes = lectureNotes.map((file) => file.path).join(",");
    }

    // Process lecture videos
    if (lectureVideos && lectureVideos.length > 0) {
      courseData.lectureVideos = lectureVideos
        .map((file) => file.path)
        .join(",");
    }

    // Process Thumbnail
    if (preview && preview.length > 0) {
      courseData.preview = preview.map((file) => file.path).join(",");
    }

    // Add lessons data
    const lessons = JSON.parse(courseData.lessons);
    courseData.lessons = lessons;

    // Calculate the number of lessons
    const totalLessons = lessons.length;
    courseData.totalLessons = totalLessons;

    const course = new Course(courseData);
    await course.save();

    res.status(201).send(course);
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(500).send({ error: "Error uploading data" });
  }
};

// Function to retrieve all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching courses" });
  }
};

// Function to retrieve a course by its ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by its ID
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    // If the course exists, send it as a response
    res.status(200).send(course);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).send({ error: "Error fetching course" });
  }
};

// Function to update a course by its ID
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by its ID
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });

    // Check if the course exists
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    // If the course exists, send it as a response
    res.status(200).send({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).send({ error: "Error updating course" });
  }
};

// Function to delete a course by its ID
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by its ID and delete it
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    // Check if the course was found and deleted
    if (!deletedCourse) {
      return res.status(404).send({ error: "Course not found" });
    }

    // If the course was deleted successfully, send a success message
    res
      .status(200)
      .send({ message: "Course deleted successfully", deletedCourse });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).send({ error: "Error deleting course" });
  }
};
 */