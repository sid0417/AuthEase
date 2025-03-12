/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "./Loading/page";

export default function ProfilePage() {
  const [id, setId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("userId") : null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Logout function
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      localStorage.removeItem("userId"); // Clear user ID
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  // Fetch user data
  const getUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      const userId = res.data.data._id;
      setId(userId);
      localStorage.setItem("userId", userId); // Store user ID in localStorage
    } catch (error: any) {
      console.log(`Something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data only if ID is not available
  useEffect(() => {
    if (!id) getUserData();
  }, [id]);

  if (loading) return <Loading value="Processing" />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#1a1f38] text-white px-4">
      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-lg shadow-lg rounded-2xl p-8 sm:p-10 w-full max-w-md border border-gray-700 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Profile</h1>
        <p className="text-gray-400 mb-6">Welcome to your profile page.</p>

        <div className="space-y-4">
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition w-full"
          >
            Logout
          </button>

          {id && (
            <Link
              href={`/profile/${id}`}
              className="block bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition w-full text-center"
            >
              View Profile Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
