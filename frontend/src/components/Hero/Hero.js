import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

export const Hero = ({
  heroData,
  setHeroCount,
  heroCount,
  setPlayStatus,
  playStatus,
}) => {
  return (
    <div className="hero">
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      {/*  <p>Explore the features</p> */}
      {/* Use Link to navigate to another page */}
      {/* <Link to="/features">
          <img
            src={arrowbtn}
            alt=" "
            style={{ width: "50px", height: "50px" }}
          />
        </Link> */}

      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li
            onClick={() => setHeroCount(0)}
            className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}
          ></li>
          <li
            onClick={() => setHeroCount(1)}
            className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}
          ></li>
          <li
            onClick={() => setHeroCount(2)}
            className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}
          ></li>
        </ul>
      </div>
    </div>
  );
};
