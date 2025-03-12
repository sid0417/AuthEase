/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
}, []);


useEffect(() => {
  if(token.length > 0) {
      verifyUserEmail();
  }
}, [token]);

return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-black to-[#1a1f38]">
    <h1 className="text-4xl text-white">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black rounded-md">
      {token ? `${token}` : "No token"}
    </h2>

    {verified && (
      <div className="mt-4">
        <h2 className="text-2xl text-green-400">Email Verified</h2>
        <Link href="/login" className="text-blue-400 underline">
          Login
        </Link>
      </div>
    )}
    
    {error && (
      <div className="mt-4 p-2 bg-red-500 text-black rounded-md">
        <h2 className="text-2xl">Error</h2>
      </div>
    )}
  </div>
);


}
