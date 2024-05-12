const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  InstructorId: {
    type: String,
    required: true,
  },
  CourseName: {
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
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  lectureVideos: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  lessons: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  totalLessons: {
    type: Number,
    default: function () {
      return this.lessons.length;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
