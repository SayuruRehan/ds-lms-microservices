const express = require("express");
const router = express.Router();
const Learner = require("../models/learnerSchema");

// --------------------- Update lesson completion status -------------------------------
router.post("/lesson/complete", async (req, res) => {
  try {
    const { learnerId, courseId, lessonId } = req.body;

    // Find the learner
    const learner = await Learner.findOne({learnerId});

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Find the enrolled course
    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    if (!enrolledCourse) {
      return res
        .status(404)
        .json({ error: "Course not found or not enrolled" });
    }

    // Check if the lesson is already completed
    const lessonIndex = enrolledCourse.lessonsCompleted.findIndex(
      (lesson) => lesson.lessonId === lessonId
    );
    if (lessonIndex !== -1) {
      return res.status(400).json({ error: "Lesson already completed" });
    }

    // Add lesson to completed lessons
    enrolledCourse.lessonsCompleted.push({ lessonId, completed: true });
    await learner.save();

    res.status(200).json({ message: "Lesson completed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve progress for a specific course
router.get("/course/:learnerId/:courseId", async (req, res) => {
  try {
    const { learnerId, courseId } = req.params;

    // Find the learner
    const learner = await Learner.findById(learnerId);

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Find the enrolled course
    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    if (!enrolledCourse) {
      return res
        .status(404)
        .json({ error: "Course not found or not enrolled" });
    }

    // Calculate progress
    const totalLessons = enrolledCourse.lessonsCompleted.length;
    const completedLessons = enrolledCourse.lessonsCompleted.filter(
      (lesson) => lesson.completed
    ).length;
    const progress = (completedLessons / totalLessons) * 100;

    res.status(200).json({ courseId, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve progress for all courses enrolled by a learner
router.get("/course/progress/:learnerId", async (req, res) => {
  try {
    const { learnerId } = req.params;

    // Find the learner
    const learner = await Learner.findById(learnerId);

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Calculate progress for each enrolled course
    const courseProgress = learner.enrolledCourses.map((course) => {
      const totalLessons = course.lessonsCompleted.length;
      const completedLessons = course.lessonsCompleted.filter(
        (lesson) => lesson.completed
      ).length;
      const progress = (completedLessons / totalLessons) * 100;
      return { courseId: course.courseId, progress };
    });

    res.status(200).json(courseProgress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
