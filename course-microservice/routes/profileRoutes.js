// profileRoutes.js

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");

router.get(
  "/profile",
  authenticateToken,
  profileController.getProfileController
);
router.put(
  "/profile",
  authenticateToken,
  profileController.updateProfileController
);

module.exports = router;
