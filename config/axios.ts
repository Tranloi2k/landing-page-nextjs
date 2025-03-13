// src/app/axios-config.ts

import axios from "axios";

// Tạo một instance Axios với cấu hình tùy chỉnh
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_SERVER, // Thay đổi URL theo API của bạn
  timeout: 10000, // Thời gian timeout (10 giây)
  headers: {
    "Content-Type": "application/json",
    // Có thể thêm các header khác ở đây
  },
});

// Bạn có thể thêm interceptor nếu cần
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token hoặc làm gì đó trước khi gửi request
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi tại đây
    return Promise.reject(error);
  }
);

export default axiosInstance;
