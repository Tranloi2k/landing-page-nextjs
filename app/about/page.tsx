import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dan Map",
  description: "dan map u",
};

const About = () => {
  const needChangeName = () => {
    return 0;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(needChangeName());
  // Chỉ chạy một lần khi component mount

  return (
    <div>
      <div className="h-[900px]">about</div>
    </div>
  );
};

export default About;
