const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }

    const { name, email, password, facultyId, courseId } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      faculty: facultyId,
      course: courseId,
    });

    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    // Find user by email
    const user = await userModel.findOne({ email: req.body.email });

    // If user is not found, return error
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    // Check if the provided password matches the hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    // If passwords don't match, return error
    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Invalid Email or Password", success: false });
    }

    // Generate JWT token
    const tokenPayload = { id: user._id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return success response with token and user information
    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
      userId: user._id,
      username: user.name,
    });
  } catch (error) {
    // Log and return error response
    console.error("Error in loginController:", error);
    res.status(500).send({
      message: `Error in Login Controller: ${error.message}`,
      success: false,
    });
  }
};

//This function is responsible for authenticating users
const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
};
