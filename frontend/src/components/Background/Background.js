import React, { useState, useEffect } from "react";
import "./Background.css";

import imag1 from "../../assets/bg.jpg";

//const backgroundImages = [imag1, imag2, imag3, imag4];

export const Background = ({ playStatus }) => {
  const [currentBackground, setCurrentBackground] = useState(imag1);

  return (
    <>
      <img src={currentBackground} className="background" alt="Background" />
    </>
  );
};
