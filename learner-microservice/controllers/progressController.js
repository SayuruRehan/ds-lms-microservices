const express = require("express");
const router = express.Router();
const Learner = require("../models/learnerSchema");

// --------------------- Update lesson completion status -------------------------------
router.post("/lesson/complete", async (req, res) => {
  try {
    const { learnerId, courseId, lessonId, totalLessons } = req.body;

    // Find the learner
    const learner = await Learner.findOne({ learnerId });

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
    enrolledCourse.lessonsCompleted.push({ lessonId });
    await learner.save();

    // Update progress of the course
    const completedLessons = enrolledCourse.lessonsCompleted.length;
    const progress = (completedLessons / totalLessons) * 100;
    enrolledCourse.progress = progress;
    await learner.save();

    res
      .status(200)
      .json({ message: "Lesson completed successfully", progress: progress + "%"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//--------------------- Progress of a specific course -------------------------------
router.get("/:learnerId/:courseId", async (req, res) => {
  try {
    const { learnerId, courseId } = req.params;
    const { totalLessons } = req.body;

    // Find the learner
    const learner = await Learner.findOne({ learnerId });

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

    // ---------------------------------
    // Calculate progress
    const completedLessons = enrolledCourse.lessonsCompleted.length;
    const progress = (completedLessons / totalLessons) * 100;

    // Update enrolledCourse.progress
    enrolledCourse.progress = progress;
    // ----------------------------------
    //const progress = enrolledCourse.progress
    await learner.save();

    res.status(200).json({ courseId, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --------------- Retrieve progress for all courses enrolled by a learner --------------------------
router.get("/:learnerId", async (req, res) => {
  try {
    const { learnerId } = req.params;
    const totalLessons = req.body;

    // Find the learner
    const learner = await Learner.findOne({ learnerId });

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Calculate progress for each enrolled course
    const courseProgress = learner.enrolledCourses.map((course) => {
      //   const totalLessons = course.lessonsCompleted.length;
      //   const completedLessons = course.lessonsCompleted.filter(
      //     (lesson) => lesson.completed
      //   ).length;

      //   const completedLessons = course.lessonsCompleted.length;
      //   const progress = (completedLessons / totalLessons) * 100;
      const progress = course.progress;
      return { courseId: course.courseId, progress };
    });

    res.status(200).json(courseProgress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------------- Route to get completed lessons of a particular course for a learner ---------------------
router.post("/completedLessons", async (req, res) => {
  try {
    const { learnerId, courseId } = req.body;

    const learner = await Learner.findOne({ learnerId });

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this learner" });
    }


    res.json(enrolledCourse.lessonsCompleted);
  } catch (error) {
    console.error("Error fetching completed lessons:", error);
    res.status(500).json({ error: "Error fetching completed lessons" });
  }
});


module.exports = router;
