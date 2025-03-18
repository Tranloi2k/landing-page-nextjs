"use client";
import React, { useState } from "react";
import axiosInstance from "@/config/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("loi@gmail.com");
  const [password, setPassword] = useState("tranloi1");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.post(
        "auth/login",
        { email, password },
        {
          withCredentials: true, // Đảm bảo gửi cookie
        }
      );
      // Lưu token vào cookie
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed: " + error);
    }
  };

  const fetchProtectedData = async () => {
    try {
      const response = await axiosInstance.get("protected", {
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
