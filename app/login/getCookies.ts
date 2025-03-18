import { cookies } from "next/headers";
const getCookies = async () => {
  const cookie = (await cookies()).get("session")?.value;
  return cookie;
};

export default getCookies;
