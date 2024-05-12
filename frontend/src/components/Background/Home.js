import React from "react";
import { Background } from "./Background";
import { NavBar } from "../NavBar/NavBar";
import { Hero } from "../Hero/Hero";

const Home = ({
  playStatus,
  heroCount,
  setPlayStatus,
  heroData,
  setHeroCount,
}) => {
  return (
    <div>
      <Background heroCount={heroCount} />
      <NavBar />
      <Hero
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
      />
    </div>
  );
};

export default Home;
