const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const path = require("path");
const multer = require("multer");
const axios = require("axios");

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
  }
);

// Route to retrieve all courses
router.get("/get", async (req, res) => {
  try {
    const courses = await Course.find();

    // Make request to local notification microservice
    await axios.post("http://localhost:4005/api/v1/notification/add", {
      title: "New Courses Available",
      message: "New courses are available for you to explore!",
      role: "admin", // Assuming admin role for notification
    });

    res.status(200).send(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
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

// Route to update a course by its ID
router.put("/update/:courseId", async (req, res) => {
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
});

// Route to approve a course by its ID
router.post("/approve/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by its ID
    const course = await Course.findByIdAndUpdate(
      courseId,
      { status: "approved" },
      { new: true }
    );
    // Check if the course exists
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    // Make request to local notification microservice
    await axios.post("http://localhost:4005/api/v1/notification/add", {
      title: "New Course Approved",
      message: "New approved course is available for you to explore!",
      role: "admin", // Assuming admin role for notification
    });

    // If the course exists, send it as a response
    res.status(200).send({ message: "Course approved successfully", course });
  } catch (error) {
    res.status(500).send({ error: "Error approving course" });
  }
});

// Route to reject a course by its ID
router.post("/reject/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by its ID and update its status to "rejected"
    const course = await Course.findByIdAndUpdate(
      courseId,
      { status: "rejected" },
      { new: true }
    );

    // Check if the course exists
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    // Make request to local notification microservice
    await axios.post("http://localhost:4005/api/v1/notification/add", {
      title: "New Course Rejected",
      message: "New rejected course is available for you to explore!",
      role: "admin", // Assuming admin role for notification
    });

    // If the course exists, send it as a response
    res.status(200).send({ message: "Course rejected successfully", course });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).send({ error: "Error rejecting course" });
  }
});

// Route to delete a course by its ID
router.delete("/delete/:courseId", async (req, res) => {
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
});

// Route to retrieve all approved courses
router.get("/getApproved", async (req, res) => {
  try {
    const courses = await Course.find({ status: "approved" });
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching approved courses" });
  }
});

// Route to retrieve all rejected courses
router.get("/getRejected", async (req, res) => {
  try {
    const courses = await Course.find({ status: "rejected" });
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching rejected courses" });
  }
});

// Route to retrieve pending courses
router.get("/getPending", async (req, res) => {
  try {
    const pendingCourses = await Course.find({ status: "pending" });
    res.status(200).send(pendingCourses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching pending courses" });
  }
});

module.exports = router;
