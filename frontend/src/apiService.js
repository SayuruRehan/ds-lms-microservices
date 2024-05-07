/* // apiService.js

import axios from "axios";

const saveImageToProfile = async (userId, imageUrl) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/saveImage",
      { userId, imageUrl }, // Ensure data is correctly passed
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving image to profile:", error);
    throw error;
  }
};

export { saveImageToProfile };
 */

// apiService.js

import axios from "axios";

const saveImageToProfile = async (userId, imageUrl) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/saveImage", // Assuming this is your backend endpoint to save image URL to user profile
      { userId, imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving image to profile:", error);
    throw error;
  }
};

export { saveImageToProfile };
