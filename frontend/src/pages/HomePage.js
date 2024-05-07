import React from "react";
import Layout from "../pages/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen flex justify-center items-center">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Explore the Universe with NASA
          </h1>
          <p className="text-white text-lg mb-8 text-center">
            Discover the wonders of space with NASA's public APIs. Dive into
            breathtaking images, fascinating data, and incredible discoveries.
          </p>
          {/* Content without API data */}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
