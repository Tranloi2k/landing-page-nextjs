import type { NextConfig } from "next";
import TerserPlugin from "terser-webpack-plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos", "dummyimage.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            // Các tùy chọn Terser
            ecma: 2015, // Chọn phiên bản ECMAScript
            compress: {
              drop_console: true, // Xóa console.log
              dead_code: false, // Loại bỏ mã chết
            },
            mangle: true, // Rút gọn tên biến
            output: {
              comments: false, // Không giữ lại chú thích
            },
          },
          extractComments: false, // Không tách chú thích ra tệp riêng
        })
      );
    }
    return config;
  },
};

export default nextConfig;
