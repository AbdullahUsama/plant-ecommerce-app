import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "./img/logo_plant.png"; // Import the logo

const Navbar = () => {
  const { user } = useUser(); // Fetches the current user from Clerk

  return (
    <nav className="bg-green-900 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Brand Logo" className="h-8 w-8 rounded-full" />
            <span className="ml-2 text-lg font-bold hover:text-gray-200 transition">
              Bloom
            </span>
          </a>
          {/* Divider */}
          <div className="text-white mx-4">|</div>
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              to="/about-us"
              className="text-sm font-semibold hover:text-green-200 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold hover:text-green-200 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* User Info and Actions */}
        <div className="flex items-center space-x-4">
          {/* Display Username */}
          {user && (
            <span className="text-sm font-medium">
              Hi, {user.firstName || user.username || "User"}!
            </span>
          )}

          {/* User Button from Clerk */}
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
