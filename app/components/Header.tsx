// components/Header.tsx
"use client"; // Thêm dòng này để đánh dấu đây là Client Component
// components/Header.js
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link từ next/link

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
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 ${isScrolled ? 'bg-blue-600 py-2' : 'bg-blue-600 py-4'} text-white`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className={`text-lg font-bold transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-lg'}`}>Your Site Title</h1>
                <nav>
                    <Link href="/" passHref>
                        <span className="mr-4 hover:text-blue-300 cursor-pointer">Home</span>
                    </Link>
                    <Link href="/about" passHref>
                        <span className="mr-4 hover:text-blue-300 cursor-pointer">About</span>
                    </Link>
                    <Link href="/contact" passHref>
                        <span className="hover:text-blue-300 cursor-pointer">Contact</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;