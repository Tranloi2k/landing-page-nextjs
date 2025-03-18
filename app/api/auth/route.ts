// import { serialize } from "cookie";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const sessionData = req.body;
//   console.log(sessionData);

//   const cookie = serialize("session", sessionData, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 60 * 60 * 24 * 7, // One week
//     path: "/",
//   });
//   res.setHeader("Set-Cookie", cookie);
//   res.status(200).json({ message: "Successfully set cookie!" });
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json(); // Dữ liệu từ client
  const response = NextResponse.json({ message: "Data received", data });

  response.cookies.set("session", data.token, {
    httpOnly: true, // Chỉ server có thể đọc cookie
    secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong production
    maxAge: 60 * 60 * 24 * 7, // Thời gian sống của cookie (7 ngày)
    path: "/", // Cookie có hiệu lực trên toàn bộ trang web
  });

  return response;
}
