/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message
  const router = useRouter(); // Initialize Next.js router

  const requestResetLink = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/users/resetpassword", { email });
      setMessage(response.data.message); // Show success message
      setEmail(""); // Clear input after request
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-b from-black to-[#1a1f38]">
      <h1 className="text-3xl text-white mb-4">Reset Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 border rounded-md bg-gray-800 text-white w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className={`mt-4 px-4 py-2 rounded-md transition ${
          email
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
        onClick={requestResetLink}
        disabled={loading}
      >
        {loading ? "Sending..." : "Reset Password"}
      </button>

      {/* Show success or error message below */}
      {error && (
        <div className="mt-4 w-80 bg-red-500 text-white text-sm font-medium p-3 rounded-md shadow-md flex items-center justify-center">
          {error}
        </div>
      )}

      {message && <p className="text-green-400 text-sm mt-2">{message}</p>}

      {/* Back to Login Button */}
      <button
        className="mt-6 text-blue-400 hover:underline"
        onClick={() => router.push("/login")}
      >
        Back to Login
      </button>
    </div>
  );
}
