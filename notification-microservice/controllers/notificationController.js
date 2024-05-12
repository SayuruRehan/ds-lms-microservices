const Notification = require("../models/notificationSchema");

// Controller function for creating a new notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, role } = req.body;

    const newNotification = new Notification({
      title,
      message,
      role,
    });

    await newNotification.save();

    res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification" });
  }
};
