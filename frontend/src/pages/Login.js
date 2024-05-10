import React from "react";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import loginImage from "../assets/bg.jpg";

const Login = () => {
  const onFinishHandler = async (values) => {
    console.log("Form values:", values);
    // Your form submission logic goes here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-screen-xl flex items-center justify-center mx-auto">
        {/* Form Section */}
        <div className="w-1/2 bg-white shadow-md rounded px-10 py-10 md:py-24 md:px-12 md:mr-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8 mt-0">
            Login Form
          </h2>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <Form.Item label="Email" name="email" className="mb-4">
              <Input
                type="email"
                required
                className="w-full"
                placeholder="Enter your email"
              />
            </Form.Item>
            <Form.Item label="Password" name="password" className="mb-4">
              <Input
                type="password"
                required
                className="w-full"
                placeholder="Enter your password"
              />
            </Form.Item>

            <Link
              to="/register"
              className="block text-center mt-4 text-blue-500 hover:text-blue-700"
            >
              Not a user? Register here
            </Link>
            <button
              className="w-full mt-6 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </Form>
        </div>
        {/* Image Section */}
        <div className="w-1/2">
          <img
            src={loginImage}
            alt="Login"
            className="w-full object-cover h-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
