const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Route to add a new course
router.post("/add", courseController.addCourse);

// Route to retrieve all courses
router.get("/get", courseController.getAllCourses);

// Route to retrieve a course by its ID
router.get("/get/:courseId", courseController.getCourseById);

// Route to update a course by its ID
router.put("/update/:courseId", courseController.updateCourse);

// Route to delete a course by its ID
router.delete("/delete/:courseId", courseController.deleteCourse);

module.exports = router;
