import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/Background/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Background/Footer";

import EnrolledCourses from "./learner/EnrolledCourses";
import CoursePage from "./learner/CoursePage";
import Success from "./learner/Success";
import Unsuccess from "./learner/Unsuccess";
import Enroll from "./learner/Enroll";

import AddCourseForm from "./course/AddCourseForm";
import CourseList from "./course/CourseList";
import AdminCourseView from "./course/AdminCourseView";
import EditCourseForm from "./course/EditCourseForm";

export default function App() {
  return (
    <div className="">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Courses Routes - Instructor */}
          <Route path="/addCourse" element={<AddCourseForm />} />
          <Route path="/list" element={<CourseList />} />
          <Route path="/edit/:courseId" element={<EditCourseForm />} />

          {/* Courses Routes - Admin */}
          <Route path="/adminList" element={<AdminCourseView />} />

          {/* Learner Routes */}
          <Route path="/all" element={<Enroll />} />
          <Route path="/courses/:courseID" element={<CoursePage />} />

          <Route path="/enrolledCourses" element={<EnrolledCourses />} />

          <Route path="/enroll/success" element={<Success />} />
          <Route path="/enroll/unsuccess" element={<Unsuccess />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
