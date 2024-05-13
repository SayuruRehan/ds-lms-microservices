import React from "react";
import Cover from "../assets/Cover1.png";
import NavBar from "./NavBar";

const HeroCover = () => {
  return (
    <div
      className="relative inset-0 z-0 bg-center bg-cover"
      style={{ height: "35vh" }}
    >
      <div
        className="absolute inset-0 z-0 bg-green-950"
        // style={{ backgroundImage: `url(${Cover})` }}
      >
        {/* <NavBar/> */}
        {/* <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          src={Hero}
        /> */}
      </div>
      <header className="absolute px-8 py-0 top-10 md:top-52">
        <div className="items-start justify-center text-center">
          <h1 className="text-lg font-bold text-white md:text-5xl">
            Enrolled Courses
          </h1>
        </div>
      </header>
    </div>
  );
};

export default HeroCover;
