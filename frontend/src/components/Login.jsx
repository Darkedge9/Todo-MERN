import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://todo-backend-cyjx.onrender.com/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", data);
      toast.success(data.message || "Logged in successfully!");
      localStorage.setItem("jwt", data.token);
      navigateTo("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);

     
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "User login failed";

      toast.error(message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Password</label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
          >
            Login
          </button>

          <p className="mt-4 text-center text-gray-600">
            New User?{" "}
            <Link
              to="/signup"
              className="text-blue-700 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
