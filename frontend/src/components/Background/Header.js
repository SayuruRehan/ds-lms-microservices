import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const username = localStorage.getItem("username");

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">EduSphere</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-gray-300">
                Features
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-300">
                Profile
              </Link>
            </li>
            {username && (
              <li>
                <span className="hover:text-gray-300 text-blue-300">
                  {username}
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
