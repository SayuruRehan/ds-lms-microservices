const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Route for creating a new notification
router.post("/add", notificationController.createNotification);

module.exports = router;
