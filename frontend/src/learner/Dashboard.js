import React, { useState } from "react";
import EnrolledCourses from "./EnrolledCourses";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <SideNavBar activeTab={activeTab} handleTabChange={handleTabChange} /> */}
      {/* Main Content */}
      <div className="flex-1">
        <div className="container px-4 mx-auto">
          {activeTab === "Dashboard" && <h1 className="mb-4 text-3xl font-semibold">Dashboard</h1>}
          {activeTab === "MyProfile" && <h1 className="mb-4 text-3xl font-semibold">My Profile</h1>}
          {activeTab === "EnrolledCourses" && <EnrolledCourses />}
          {activeTab === "Progress" && <h1 className="mb-4 text-3xl font-semibold">Progress</h1>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
