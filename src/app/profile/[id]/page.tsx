/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loading from "../../Loading"
export default function UserProfile() {
  const [data, setData] = useState<{ email?: string; username?: string }>({});
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res.data.data);
    } catch (error: any) {
      console.log(`Something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#1a1f38] text-white px-4">
      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-lg shadow-lg rounded-2xl p-8 sm:p-10 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-200">
          Profile
        </h1>
        <p className="text-lg text-gray-400 text-center mb-6">
          Welcome to your profile page.
        </p>

        <div className="space-y-4">
          <h2 className="text-gray-300 font-medium">
            Email:{" "}
            <span className="p-2 rounded-md bg-orange-500 text-white">
              {data?.email || "N/A"}
            </span>
          </h2>

          <h2 className="text-gray-300 font-medium">
            Username:{" "}
            <span className="p-2 rounded-md bg-orange-500 text-white">
              {data?.username || "N/A"}
            </span>
          </h2>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
