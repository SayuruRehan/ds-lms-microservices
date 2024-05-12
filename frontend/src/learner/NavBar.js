import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

const NavBar = () => {
  return (
    <nav className="">
      <div className="flex flex-row px-1 py-3 mx-auto max-w-7xl">
        
        <div className="flex items-center">
          
          <Link to="/" className="text-lg font-semibold text-white">
          EduScpere
          </Link>
        </div>

        <div className="justify-end flex-grow hidden lg:flex">
        <Link
            to="/list"
            className="px-4 py-2 font-medium text-white rounded-md text-md hover:bg-pink-800"
          >
            Admin Panel
          </Link>
          <Link
            to="/all"
            className="px-4 py-2 font-medium text-white rounded-md text-md hover:bg-pink-800"
          >
           All Courses
          </Link>
          <Link
            to="/enrolledCourses"
            className="px-4 py-2 font-medium text-white rounded-md text-md hover:bg-pink-800"
          >
            My Courses
          </Link>
          {/* <Link
            to="/random"
            className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-pink-800"
          >
            Random APODs
          </Link> */}

         

          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
