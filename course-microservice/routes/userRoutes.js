const express = require("express");
const {
  loginController,
  registerController,
  authController,
} = require("../controllers/userCtrl");

const authMiddleware = require("../middlewares/authMiddleware");
const GetUsers = require("../controllers/GetUsers");

// Router object
const router = express.Router();

// Routes
// LOGIN || POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);

// Auth || POST
router.post("/getUserData", authMiddleware, authController);

// Get all users || GET
router.get("/users", GetUsers.getAllUsers);

module.exports = router;
