import React from "react";
import successBackground from "../assets/success2.png";
import {BsCheck2Circle} from "react-icons/bs";

const Success = () => {
  return (
    <div class="bg-gray-100">
      <div class="mt-16 bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p class="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div class="py-10 text-center">
            <a
              href="/enrolledCourses"
              class="px-12 bg-green-800 hover:bg-green-700 text-white font-semibold py-3"
            >
              START MY JOURNY
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
