import React from "react";

const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={image} alt={title} className="w-full rounded-lg mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
