import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="w-full backdrop-blur-md bg-amber-700/80 shadow-inner mt-10"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="container mx-auto px-4 py-6 text-center text-white">
        <p className="text-sm tracking-wide">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
