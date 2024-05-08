const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  learnerId: {
    type: String,
    required: true,
    unique: true,
  },
  enrolledCourses: [
    {
      type: String,
    },
  ],
  completedCourses: [
    {
      type: String,
    },
  ],
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "default_profile.jpg",
  },
  dateOfBirth: {
    type: Date,
  },
  contactNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Learner", learnerSchema);
