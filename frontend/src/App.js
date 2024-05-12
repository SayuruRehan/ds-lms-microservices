import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Background/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import EnrolledCourses from "./learner/EnrolledCourses";
import Dashboard from "./learner/Dashboard";
import CoursePage from "./learner/CoursePage";
import AddCourseForm from "./course/AddCourseForm";
import CourseList from "./course/CourseList";
import AdminCourseView from "./course/AdminCourseView";
import EditCourseForm from "./course/EditCourseForm";
import Success from "./learner/Success";
import Unsuccess from "./learner/Unsuccess";
import Enroll from "./learner/Enroll";
import Header from "./components/Header";

export default function App() {
  const heroData = [
    {text1: "Learn. Explore. ", text2: "Grow. Thrive"},
    {text1: "Knowledge at ", text2: "Your Fingertips"},
    {text1: "Your Gateway", text2: "to Learning"},
  ];

  const [heroCount, setHeroCount] = useState(0);

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/addCourse" element={<AddCourseForm />} />
          <Route path="/list" element={<CourseList />} />
          {/* <Route path="/video" element={<UploadVideo />} />
        <Route path="/vlist" element={<LectureVideos />} /> */}

          {/* Learner Routes */}
          <Route path="/enrolledCourses" element={<EnrolledCourses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses/:courseID" element={<CoursePage />} />
          <Route path="/all" element={<Enroll />} />
          <Route path="/enroll/success" element={<Success />} />
          <Route path="/enroll/unsuccess" element={<Unsuccess />} />

          <Route path="/adminList" element={<AdminCourseView />} />
          <Route path="/edit/:courseId" element={<EditCourseForm />} />
        </Routes>
      </Router>
    </>
  );
}
