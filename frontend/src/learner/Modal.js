import React from "react";

const Modal = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg z-10 w-96 p-6">
        <div className="flex justify-end">
          <button className="text-sm text-gray-500" onClick={closeModal}>
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
