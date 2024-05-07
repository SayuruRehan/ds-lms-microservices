// profileController.js

const userModel = require("../models/userModels");

const getProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in getting profile", success: false });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, facultyId, courseId } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { name, faculty: facultyId, course: courseId },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    res
      .status(200)
      .send({ message: "Profile updated successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in updating profile", success: false });
  }
};

module.exports = {
  getProfileController,
  updateProfileController,
};
