const express = require("express");
const router = express.Router();
const Learner = require("../models/learnerSchema");

//---------------------------- Enroll -------------------------------------
router.post("/course/enroll", async (req, res) => {
  try {
    const { learnerId } = req.body;
    const courseId = req.query.courseId;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Find the learner by learnerId
    const learner = await Learner.findOne({ learnerId }); // Change findById to findOne

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Check if the learner is already enrolled in the course
    const isEnrolled = learner.enrolledCourses.some(
      (course) => course.courseId === courseId
    );
    if (isEnrolled) {
      return res
        .status(400)
        .json({ error: "Learner is already enrolled in this course" });
    }

    // Add the course to the learner's enrolledCourses array
    learner.enrolledCourses.push({ courseId });
    await learner.save();

    res.status(200).json({ message: "Student enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --------------------------- Unenroll -------------------------------------
router.post("/course/unenroll", async (req, res) => {
  try {
    const { learnerId, courseId } = req.body;

    // Check if the learner exists
    const learner = await Learner.findOne({ learnerId });

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Check if the learner is enrolled in the course - if not findIndex return -1
    const index = learner.enrolledCourses.findIndex(
      (course) => course.courseId.toString() === courseId
    );

    if (index === -1) {
      return res
        .status(400)
        .json({ error: "Learner is not enrolled in this course" });
    }

    // Remove the course from the learner's enrolledCourses array
    learner.enrolledCourses.splice(index, 1);
    await learner.save();

    res.status(200).json({ message: "Student unenrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------- Get All enrollments for a specific learner -----------------------------
router.get("/enrollments/:learnerId", async (req, res) => {
  try {
    const { learnerId } = req.params;

    // Check if the learner exists
    const learner = await Learner.findOne({ learnerId });

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    res.status(200).json({ enrolledCourses: learner.enrolledCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ---------------------------- create a new learner ------------------------------
router.post("/create", async (req, res) => {
  try {
    const { learnerId } = req.body;

    // Check if learner already exists
    const existingLearner = await Learner.findOne({ learnerId });
    if (existingLearner) {
      return res.status(400).json({ error: "Learner already exists" });
    }

    const newLearner = new Learner(req.body)
    await newLearner.save();
    res
      .status(201)
      .json({ message: "Learner created successfully", learner: newLearner });
  } catch (error) {
    console.error("Error creating learner:", error);

    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
