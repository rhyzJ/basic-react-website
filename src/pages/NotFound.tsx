import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <img src="/icons/lost.png" alt="Lost Icon" className="w-40 mb-10" />
      <p className="text-2xl text-gray-600 mb-6">Hmm that page doesn't exist</p>
      <Link
        to="/"
        className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-900 transition duration-300"
      >
        Take me Home
      </Link>
    </div>
  );
};

export default NotFound;
