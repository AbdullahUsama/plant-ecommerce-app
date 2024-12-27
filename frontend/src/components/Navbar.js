import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
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
              OnlyPlants
            </span>
          </a>
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
