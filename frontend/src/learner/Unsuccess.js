import React from "react";

const Unsuccess = () => {
  return (
    <div class="bg-gray-100">
      <div class="mt-16 bg-white p-6  md:mx-auto">
        <svg
          class="text-red-600 w-16 h-16 mx-auto my-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
            clip-rule="evenodd"
          />
        </svg>

        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Rejected!
          </h3>
          <p class="text-gray-600 my-2">Sorry! Your payment is cancelled.</p>
          <p> Please try again after sevaral minitues</p>
          <div class="py-10 text-center">
            <a
              href="/all"
              class="px-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsuccess;
