const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  completedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  
});

module.exports = mongoose.model("Learner", learnerSchema);