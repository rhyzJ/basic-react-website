import React from "react";
import { Link } from "react-router-dom";

const FormButton: React.FC = () => {
  return (
    <Link to="/form">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition-all duration-300 ease-in-out">
        Fill Out Form
      </button>
    </Link>
  );
};

export default FormButton;
