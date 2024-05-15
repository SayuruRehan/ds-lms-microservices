import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "./components/Background/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Background/Footer";
import PageNotFound from "./pages/PageNotFound";

import EnrolledCourses from "./learner/EnrolledCourses";
import CoursePage from "./learner/CoursePage";
import Success from "./learner/Success";
import Unsuccess from "./learner/Unsuccess";
import Enroll from "./learner/Enroll";

import AddCourseForm from "./course/AddCourseForm";
import CourseList from "./course/CourseList";
import AdminCourseView from "./course/AdminCourseView";
import EditCourseForm from "./course/EditCourseForm";
import LearnerProgress from "./learner/LearnerProgress";

export default function App() {
  const [tokenCookie] = useCookies(["token"]);
  const [roleCookie] = useCookies(["role"]);

  const isAuthenticated = () => {
    return tokenCookie.token !== undefined && roleCookie.role !== undefined;
  };

  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Protected routes */}
          {isAuthenticated() && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {roleCookie.role === "instructor" ||
              roleCookie.role === "admin" ? (
                <>
                  <Route path="/addCourse" element={<AddCourseForm />} />
                  <Route path="/list" element={<CourseList />} />
                  <Route path="/edit/:courseId" element={<EditCourseForm />} />
                  <Route path="/all" element={<Enroll />} />
                  <Route path="/courses/:courseID" element={<CoursePage />} />
                  <Route
                    path="/enrolledCourses"
                    element={<EnrolledCourses />}
                  />
                  <Route path="/enroll/success" element={<Success />} />
                  <Route path="/enroll/unsuccess" element={<Unsuccess />} />
                </>
              ) : null}
              {roleCookie.role === "admin" ? (
                <>
                  <Route path="/adminList" element={<AdminCourseView />} />
                  <Route path="/all" element={<Enroll />} />
                  <Route path="/courses/:courseID" element={<CoursePage />} />
                  <Route
                    path="/enrolledCourses"
                    element={<EnrolledCourses />}
                  />
                  <Route path="/enroll/success" element={<Success />} />
                  <Route path="/enroll/unsuccess" element={<Unsuccess />} />
                </>
              ) : null}
              {roleCookie.role === "learner" ? (
                <>
                  <Route path="/all" element={<Enroll />} />
                  <Route path="/courses/:courseID" element={<CoursePage />} />
                  <Route
                    path="/enrolledCourses"
                    element={<EnrolledCourses />}
                  />
                  <Route path="/enroll/success" element={<Success />} />
                  <Route path="/enroll/unsuccess" element={<Unsuccess />} />
                  <Route path="/myProgress" element={<LearnerProgress />} />
                </>
              ) : null}
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
