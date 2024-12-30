// src/LandingPage.js
import React, { useEffect } from "react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import backgroundImage from "./img/leave10.png";
import { useTranslation } from "react-i18next";
import "./i18n";

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  // Function to toggle language
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ur" : "en";
    i18n.changeLanguage(newLang);
    // Handle RTL for Urdu
    if (newLang === "ur") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
    // Save language preference
    localStorage.setItem("language", newLang);
  };

  // On component mount, set the direction based on the current language
  useEffect(() => {
    if (i18n.language === "ur") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [i18n.language]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="text-center bg-white bg-opacity-5 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-xl relative">
        {/* Language Toggle Button inside the card */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleLanguage}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 focus:outline-none"
            aria-label="Toggle Language"
          >
            {i18n.language === "en" ? "Eng | اردو" : "Eng | اردو"}
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-green-600">
          {t("welcome")}
        </h1>
        <p className="text-lg text-black mb-10">{t("description")}</p>

        {/* Updated Buttons Container */}
        <div className="flex gap-x-4 justify-center">
          <SignInButton>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              {t("signIn")}
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              {t("signUp")}
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
