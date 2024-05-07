const mongoose = require("mongoose");

const lectureVideosSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  lectureVideos: {
    type: String, 
    required: true,
  },
});

const LectureVideos = mongoose.model("LectureVideos", lectureVideosSchema);

module.exports = LectureVideos;
