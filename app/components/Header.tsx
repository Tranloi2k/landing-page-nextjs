// components/Header.tsx
"use client"; // Thêm dòng này để đánh dấu đây là Client Component
// components/Header.js
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link từ next/link
import Menu from "../constants/navMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed flex top-0 left-0 w-full transition-all duration-300 pl-4 pr-4 ${
        isScrolled ? "bg-slate-800 py-2" : "bg-slate-800 py-4"
      } text-white`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className={`text-lg font-bold transition-all duration-300 ${
            isScrolled ? "text-sm" : "text-lg"
          }`}
        >
          Landing Page
        </h1>
        <nav>
          {Menu.map((item, index) => {
            return (
              <Link key={index} href={item.url} passHref>
                <span className="mr-4 hover:text-blue-300 cursor-pointer">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
