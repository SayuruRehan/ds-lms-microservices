const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read_status: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
