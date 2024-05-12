import React from "react";
import successBackground from "../assets/success2.png";
import { BsCheck2Circle } from "react-icons/bs";


const Success = () => {
  return (
    <div
      className="flex-1 pl-8"
      // style={{
      //   backgroundImage: `url(${successBackground})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <img scr={successBackground} className="w-100 h-100"></img>
      <BsCheck2Circle  className="w-100 h-100"/>
      <h1 className="mb-4 text-lg font-semibold">
        You enrolled Successfully
      </h1>
    </div>
  );
};

export default Success;
