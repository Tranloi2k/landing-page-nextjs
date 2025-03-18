"use client";
import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "@/config/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("loi@gmail.com");
  const [password, setPassword] = useState("tranloi1");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.post(
        "http://localhost:5000/auth/login",
        { email, password },
        {
          withCredentials: true, // Đảm bảo gửi cookie
        }
      );
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: "abc123" }),
      });
      // Lưu token vào cookie
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed: " + error);
    }
  };

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/protected", {
        withCredentials: true, // Đảm bảo gửi cookie
      });
      setMessage(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <button onClick={fetchProtectedData}>call api</button>
    </>
  );
};

export default LoginForm;
