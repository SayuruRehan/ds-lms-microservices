// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Background/Header";
import Footer from "../components/Background/Footer";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4003/api/v1/profile/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileData(response.data.data); // Extracting user data

      // Retrieve saved image URLs for the user from local storage
      const userId = localStorage.getItem("userId");
      const savedImageUrls = JSON.parse(localStorage.getItem(userId)) || [];
      console.log("Retrieved image URLs:", savedImageUrls); // Debugging
      // Update profileData with image URLs
      setProfileData((prevData) => ({
        ...prevData,
        savedImageUrls: savedImageUrls,
      }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto mt-8 flex-grow">
        <h1 className="text-3xl font-semibold mb-4">Profile</h1>
        <div className="bg-white shadow-md p-10 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <p>{profileData.name}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <p>{profileData.email}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
