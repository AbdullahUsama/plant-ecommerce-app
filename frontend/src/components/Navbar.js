// src/Navbar.js
import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "./img/logo_plant.png"; // Import the logo

const Navbar = () => {
  const { user, isLoaded } = useUser(); // Fetches the current user from Clerk

  // Check if user is loaded to avoid rendering before user data is available
  if (!isLoaded) {
    return null; // or a loading spinner
  }

  // Determine if the user is an admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <>
      <nav className="bg-green-900 dark:bg-gray-800 text-white dark:text-gray-300 py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand/Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Brand Logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-lg font-bold hover:text-gray-200 dark:hover:text-white transition">
                Bloom
              </span>
            </Link>
            <div className="text-white dark:text-gray-300 mx-4">|</div>
            {/* Navigation Links */}
            <div className="flex space-x-6">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="text-sm font-semibold hover:text-green-200 dark:hover:text-green-400 transition duration-300"
                >
                  Admin
                </Link>
              ) : (
                <>
                  <Link
                    to="/about-us"
                    className="text-sm font-semibold hover:text-green-200 dark:hover:text-green-400 transition duration-300"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="text-sm font-semibold hover:text-green-200 dark:hover:text-green-400 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* Display Username */}
            {user && (
              <span className="text-sm font-medium text-white-700 dark:text-gray-300">
                Hi, {user.firstName || user.username || "User"}!
              </span>
            )}

            {/* User Button from Clerk */}
            <UserButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
