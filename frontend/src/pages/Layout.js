// Layout.js
import React, { useEffect, useState } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu, facultyMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import jwt_decode from "jwt-decode"; // Import jwt-decode library

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [layoutHeight, setLayoutHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setLayoutHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Determine the SidebarMenu based on user's role
  let SidebarMenu;
  if (user?.isAdmin) {
    SidebarMenu = adminMenu;
  } else if (user?.isLecturer) {
    SidebarMenu = facultyMenu; // Use facultyMenu for lecturers
  } else {
    SidebarMenu = userMenu;
  }

  return (
    <>
      <div className="main" style={{ height: layoutHeight }}>
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Toggl Track</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.path}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={
                    user && user.notification ? user.notification.length : 0
                  }
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
