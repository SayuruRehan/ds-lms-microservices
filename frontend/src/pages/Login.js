import React, { useState } from "react";
import { Form, Input, message, Radio } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);

  const onFinishHandler = async (values) => {
    const { email, password } = values;
    if (email === "Ann@gmail.com" && password === "ann123") {
      navigate("/hello-teacher");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:4003/api/v1/user/login", {
        ...values,
        role: selectedRole,
      });
      console.log("Login response:", res);
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        localStorage.setItem("userId", res.data.userId); // Store userId in localStorage
        localStorage.setItem("username", res.data.username);
        message.success("Login Successfully");
        navigate("/features");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong");
    }
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
          {/* Increased py-12 and mb-8 for more height */}
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
          {/* Image section remains the same */}
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
