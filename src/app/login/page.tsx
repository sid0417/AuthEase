/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading/page";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(`Login success ${response.data}`);
      toast.success("Login Success");
      router.push("/");
    } catch (error: any) {
      console.log(`Something went wrong: ${error.message}`);
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  if (loading) {
    return <Loading value="Logging in" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#1a1f38] text-white px-4">
      {/* Glassmorphism Card */}
      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-lg shadow-lg rounded-2xl p-8 sm:p-10 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-200">
          {loading ? "Loading..." : "Welcome Back"}
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Please enter your credentials to login.
        </p>

        {/* Email Input */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-white"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="mb-5 text-right">
          <Link href="/resetpassword" className="text-blue-400 hover:underline text-sm">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={onLogin}
          className={`w-full py-3 text-white rounded-lg font-semibold transition duration-300 ${
            buttonDisabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 shadow-lg"
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill up" : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-sm text-gray-400 text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>

        {/* Subtle Decoration */}
        <div className="absolute top-10 left-10 w-14 h-14 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
