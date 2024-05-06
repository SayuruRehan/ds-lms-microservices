import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Background/Header";
import Footer from "../components/Background/Footer";
import FeatureCard from "./FeatureCard";
import earthImage from "../assets/bg1.jpg";
import rocketImage from "../assets/bg4.jpg";

const FeatureDisplay = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Explore the Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/apod">
            <FeatureCard
              title="Add course"
              description="Add course"
              image={earthImage}
            />
          </Link>
          <Link to="/mars">
            <FeatureCard
              title="Mars Rover Photos"
              description="Discover stunning photos captured by NASA's Mars rovers"
              image={rocketImage}
            />
          </Link>
        </div>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default FeatureDisplay;
