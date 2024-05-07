import mongoose from "mongoose";

const { Schema } = mongoose;

const learnerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    completedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
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
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
  },
  { timestamps: true }
);

const Learner = mongoose.model("Learner", learnerSchema);

export default Learner;
