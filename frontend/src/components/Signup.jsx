import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    const navigateTo=useNavigate()



  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4004/user/signup",
        {
          username,
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

      console.log("Signup successful:", data);
      toast.success(data.message|| "Registration successful!");
      localStorage.setItem("jwt", data.token); 
      navigateTo("/login")
      
      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response.data.errors || "User Registration failed ");
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex h-screen items-center justify-center bg-green-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold  mb-5 text-center">Signup</h2>
            <form onSubmit={handleRegister} action="">
              {/* Username */}
              <div className="mb-4  ">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Username
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none  focus:ring-2 focus: ring-blue-500"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Type Username"
                />
              </div>
              {/* Email */}
              <div className="mb-4  ">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none  focus:ring-2 focus: ring-blue-500"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>
              {/* Password */}
              <div className="mb-4  ">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none  focus:ring-2 focus: ring-blue-500"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
              >
                Signup
              </button>
              <p className="mt-4 text-center text-gray-600 ">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
