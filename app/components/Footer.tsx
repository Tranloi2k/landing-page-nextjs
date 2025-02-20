// components/Footer.js
const Footer = () => {

  return (
    <footer className="bg-gray-800 text-white py-4 bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <div className="mt-2">
          <a href="/about" className="text-gray-400 hover:text-gray-300">
            About
          </a>
          <span className="mx-2">|</span>
          <a href="/contact" className="text-gray-400 hover:text-gray-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
