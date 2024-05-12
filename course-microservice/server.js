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
app.use("/Preview", express.static("Preview"));

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes for Course Management
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/v1/course", courseRoutes);

// Listen on port
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
