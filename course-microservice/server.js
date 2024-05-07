const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(cors());
app.use("/Lectures", express.static("Lectures"));
app.use("/Videos", express.static("Videos"));


// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes for User Management
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/user", userRoutes);

// Routes for Profile Management
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/v1/profile", profileRoutes);

// Routes for Course Management
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/v1/course", courseRoutes);

const VideoRoutes = require("./routes/lectureVideosRoutes");
app.use("/api/v1/video", VideoRoutes);

// Endpoint to save image URL to user's profile
app.post("/api/saveImage", async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    // Check if userId and imageUrl are provided
    if (!userId || !imageUrl) {
      return res
        .status(400)
        .json({ error: "userId and imageUrl are required" });
    }

    // Assuming you have a 'users' collection/table
    const user = await db.User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's profile with the new image URL
    user.profileImage = imageUrl;
    await user.save();

    return res
      .status(200)
      .json({ message: "Image saved to profile successfully" });
  } catch (error) {
    console.error("Error saving image to profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Listen on port
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
