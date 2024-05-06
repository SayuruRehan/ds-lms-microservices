const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lectureNotes: {
    type: String, // Assuming lectureNotes is a file path
    required: true,
  },
});

const Course = mongoose.model("Lecture", courseSchema); // Changed model name

module.exports = Course;
