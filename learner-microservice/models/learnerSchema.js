const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  learnerId: {
    type: String,
    required: true,
    unique: true,
  },
  // learnerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  //   unique: true,
  // },
  enrolledCourses: [
    {
      courseId: {
        type: String,
        required: true,
      },
      progress: {
        type: Number,
        default: 0, // percentage completion
      },
      lessonsCompleted: [
        {
          lessonId: {
            type: String,
            required: true,
          },
          // completed: {
          //   type: Boolean,
          //   default: false,
          // },
        },
      ],
    },
  ],
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
