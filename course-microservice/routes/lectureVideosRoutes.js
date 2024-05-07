const express = require("express");
const router = express.Router();
const LectureVideos = require("../models/LectureVideos");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Videos"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    cb(null, `${fileName}-${Date.now()}${ext}`); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

// Create a new lecture video with file upload
router.post("/add", upload.single("lectureVideos"), async (req, res) => {
  try {
    const { courseName } = req.body;

    // Append the file path to the lecture video data
    const lectureVideosPath = req.file.path;

    // Create a new lecture video record
    const lectureVideo = new LectureVideos({
      courseName,
      lectureVideos: lectureVideosPath,
    });

    await lectureVideo.save();

    res.status(201).send(lectureVideo);
  } catch (error) {
    console.error("Error uploading lecture video:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Serve static files (videos) from the 'Videos' directory
router.use("/videos", express.static(path.join(__dirname, "../Videos")));

// GET route to retrieve uploaded videos
router.get("/list", async (req, res) => {
  try {
    // Fetch all lecture videos from the database
    const lectureVideos = await LectureVideos.find();

    // Send the list of lecture videos to the frontend
    res.status(200).send(lectureVideos);
  } catch (error) {
    console.error("Error fetching lecture videos:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
