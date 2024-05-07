const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Check if process.env.LEARNER_MONGO_URI is defined
if (!process.env.LEARNER_MONGO_URI) {
  console.error("MongoDB URI is not defined");
  process.exit(1); // Exit the process with an error code
}

mongoose
  .connect(process.env.LEARNER_MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

module.exports = mongoose.connection;
