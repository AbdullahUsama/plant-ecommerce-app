import React from "react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import backgroundImage from "./img/leave10.png";
//
export default function LandingPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="text-center bg-white bg-opacity-5 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-xl">
        <h1 className="text-4xl font-bold mb-6 text-green-600">
          Welcome to Bloom
        </h1>
        <p className="text-lg text-black mb-10">
          Sell Your Samplings, PLants, decorations and everything gardening
          here! Your Gateway to Success
        </p>

        <div className="flex space-x-4">
          <SignInButton>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>

      <footer className="mt-12 text-sm text-gray-900">
        <h1>
          <strong>
            &copy; {new Date().getFullYear()} Bloom. All rights reserved.
          </strong>
        </h1>
      </footer>
    </div>
  );
}
