import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="relative flex items-center justify-center min-h-screen bg-green-50 dark:bg-gray-900 sm:items-center sm:pt-0 transition-colors duration-300">
        <div className="w-full max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden flex justify-center items-center">
            <div className="p-8 bg-white dark:bg-gray-800 sm:rounded-lg shadow-xl transition-colors duration-300 flex flex-col justify-center border border-gray-200 dark:border-gray-700 w-full">
              <h1 className="text-4xl sm:text-5xl text-green-800 dark:text-green-300 font-extrabold tracking-tight text-center mb-6">
                Get in Touch
              </h1>
              <p className="text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2 text-center mb-8">
                We would love to hear from you. Reach out using the details
                below.
              </p>

              {/* Address */}
              <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-green-600 dark:text-green-300"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  National University of Sciences and Technology
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-green-600 dark:text-green-300"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  +92312344556
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-green-600 dark:text-green-300"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  ausama.bese22seecs@seecs.edu.pk
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
