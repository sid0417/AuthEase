/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import axios from "axios";
import { toast } from "react-toastify"; // Install via: npm install react-toastify
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter(); // Initialize router

  const handleChangePassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/users/changepassword", {
        email,
        newPassword,
      });
      toast.success(res.data.message);
      setSuccess(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#1a1f38] text-gray-800 p-6">
      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-80">
        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              ✅ Password Changed Successfully!
            </h2>
            <p className="text-gray-600 mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-white mb-4">
              Change Password
            </h2>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-md mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 border rounded-md mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-md mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className={`w-full p-3 rounded-md ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Processing..." : "Change Password"}
            </button>

            {error && (
              <div className="mt-3 bg-red-500 text-white text-sm p-2 rounded-md text-center">
                ❌ {error}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
