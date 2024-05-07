import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Background/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import AddCourseForm from "./components/AddCourseForm";
import CourseList from "./components/CourseList";
import UploadVideo from "./components/UploadVideo";
import VideoList from "./components/VideoList";

import FeatureDisplay from "./components/FeatureDisplay";

export default function App() {
  const heroData = [
    { text1: "Learn. Explore. ", text2: "Grow. Thrive" },
    { text1: "Knowledge at ", text2: "Your Fingertips" },
    { text1: "Your Gateway", text2: "to Learning" },
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              playStatus={playStatus}
              heroCount={heroCount}
              setPlayStatus={setPlayStatus}
              heroData={heroData} // Pass heroData as a prop
              setHeroCount={setHeroCount}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/features" element={<FeatureDisplay />} />
        <Route path="/addCourse" element={<AddCourseForm />} />
        <Route path="/list" element={<CourseList />} />
        <Route path="/video" element={<UploadVideo />} />
        <Route path="/vlist" element={<VideoList />} />
      </Routes>
    </Router>
  );
}
