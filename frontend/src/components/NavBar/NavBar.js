import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSignIn = () => {
    // Define a function to handle sign in button click
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="nav">
      <div className="nav-logo">EduSphere</div>
      <ul className="nav-menu">
        {/*  <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li> */}
        <li className="nav-contact">
          {/* Call handleSignIn function on button click */}
          <button onClick={handleSignIn}>Sign In</button>
        </li>
      </ul>
    </div>
  );
};
