const userModel = require("../models/userModels");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching users",
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllUsers,
};
