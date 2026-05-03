import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center px-4">

      <h1 className="text-6xl font-bold text-blue-500 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <Link
        to="/dashboard"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Go to Dashboard
      </Link>

    </div>
  );
};

export default NotFound;