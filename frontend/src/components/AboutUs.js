// src/AboutUs.js
import React from "react";
import women from "./img/logo_plant.png";
import Navbar from "./Navbar";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <section className="bg-green-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-6 lg:px-20 py-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-4">
              About Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Empowering underprivileged communities, one bloom at a time.
            </p>
          </div>

          {/* Mission Section */}
          <div className="flex flex-wrap items-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <img
                src={women}
                alt="Empowering women"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-3xl font-semibold text-green-700 dark:text-green-300 mb-4">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                At{" "}
                <span className="font-bold text-green-800 dark:text-green-400">
                  Bloom
                </span>
                , we are dedicated to empowering underprivileged individuals,
                especially women, by providing a platform to sell their plants,
                pots, saplings, decorations, and homemade crafts online. We
                believe in fostering creativity, self-sustainability, and
                financial independence for those who need it the most.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-green-700 dark:text-green-300 mb-6">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
                  Empowerment
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Creating opportunities for underprivileged individuals to
                  thrive through creativity and craftsmanship.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
                  Sustainability
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Encouraging eco-friendly practices and fostering a love for
                  nature and handmade goods.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
                  Community
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Building a supportive and inclusive space where everyone can
                  grow and prosper together.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-green-700 dark:text-green-300 mb-6">
              Join Us in Blooming Together
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Whether you're looking to support a local artist, discover unique
              handmade crafts, or start your own journey with us, Bloom is here
              to help you grow.
            </p>
            <a
              href="/contact"
              className="inline-block bg-green-600 dark:bg-green-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
