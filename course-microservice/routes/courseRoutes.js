const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const path = require("path");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "lectureNotes") {
      cb(null, "Lectures"); // Specify the destination folder for lecture notes
    } else if (file.fieldname === "lectureVideos") {
      cb(null, "Videos"); // Specify the destination folder for lecture videos
    } else if (file.fieldname === "preview") {
      cb(null, "Preview"); // Specify the destination folder for lecture videos
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    cb(null, `${fileName}-${Date.now()}${ext}`); // Generate unique filename
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

router.post(
  "/add",
  upload.fields([
    { name: "lectureNotes" },
    { name: "lectureVideos" },
    { name: "preview" },
  ]),
  async (req, res) => {
    try {
      const courseData = req.body;
      const lectureNotes = req.files["lectureNotes"];
      const lectureVideos = req.files["lectureVideos"];
      const preview = req.files["preview"];

      // Process lecture notes
      if (lectureNotes && lectureNotes.length > 0) {
        courseData.lectureNotes = lectureNotes
          .map((file) => file.path)
          .join(",");
      }

      // Process lecture videos
      if (lectureVideos && lectureVideos.length > 0) {
        courseData.lectureVideos = lectureVideos
          .map((file) => file.path)
          .join(",");
      }
      //Process Thumbnail
      if (preview && preview.length > 0) {
        courseData.preview = preview.map((file) => file.path).join(",");
      }

      // Add lessons data
      const lessons = JSON.parse(courseData.lessons);
      courseData.lessons = lessons;

      const course = new Course(courseData);
      await course.save();

      res.status(201).send(course);
    } catch (error) {
      console.error("Error uploading data:", error);
      res.status(500).send({ error: "Error uploading data" });
    }
  }
);

// Route to retrieve all courses
router.get("/get", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching courses" });
  }
});

// Route to retrieve a course by its ID
router.get("/get/:courseId", async (req, res) => {
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
});

// Route to update a course by course ID and instructor ID
router.put("/update/:courseId/:instructorId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const instructorId = req.params.instructorId;

    // Check if the course exists and has the same instructor ID
    const course = await Course.findOne({
      _id: courseId,
      InstructorId: instructorId,
    });

    if (!course) {
      return res
        .status(404)
        .send({ error: "Course not found or unauthorized" });
    }

    // Update course details
    await Course.findByIdAndUpdate(courseId, req.body, { new: true });

    res.status(200).send({ message: "Course updated successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
