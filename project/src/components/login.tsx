import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { message, token } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);
      alert(message);
      window.location.href = "/"; // Redirect after successful login
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-sm w-full"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};
