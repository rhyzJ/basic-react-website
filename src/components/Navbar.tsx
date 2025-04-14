import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md shadow-md bg-amber-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Website Name</h1>

        <button
          onClick={toggleMenu}
          className="md:hidden cursor-pointer text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden md:flex space-x-4">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.to}
                className="text-white px-4 py-2 rounded-md transition-all duration-200 backdrop-blur-md"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-md ">
          <ul className="flex flex-col ">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  onClick={() => setIsOpen(false)}
                  to={link.to}
                  className="block w-full text-white hover:bg-white/40 px-4 py-3 transition duration-200 text-center"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
