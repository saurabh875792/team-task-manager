import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // force reload (important fix 🔥)
    window.location.href = "/login";
  };

  // ❗ login/signup page pe navbar hide
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        TaskManager
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">

        {token ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/projects"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Projects
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
            >
              Signup
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;