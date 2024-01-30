"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/validate", { email, password });
    if (response.data.valid) {
      window.location.href = "/submit";
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="z-10 max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <img
            src="https://iri-nc.org/wp-content/uploads/2021/10/logo-iri-min.png"
            alt="Institution Logo"
            className="h-auto max-w-xs"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#212F65]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00AEEF] focus:border-[#00AEEF]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#212F65]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00AEEF] focus:border-[#00AEEF]"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#212F65] hover:bg-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AEEF]"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
