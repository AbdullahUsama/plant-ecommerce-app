// src/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between">
          {/* Contact Section */}
          <div className="w-full lg:w-6/12 mb-8 lg:mb-0">
            <h4 className="text-4xl font-bold mb-4">Let's Keep in Touch!</h4>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Stay connected with Bloom.
            </p>
            <div className="mt-6 flex space-x-4">
              {/* Dribbble Button */}
              <button
                className="bg-gray-200 dark:bg-gray-700 text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full hover:bg-pink-100 dark:hover:bg-pink-700 transition-colors duration-200"
                type="button"
                onClick={() => window.open("https://www.nba.com", "_blank")}
              >
                {/* Using FontAwesome Icon */}
                <i className="fab fa-dribbble"></i>
              </button>
              {/* GitHub Button */}
              <button
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                type="button"
                onClick={() =>
                  window.open("https://github.com/AbdullahUsama", "_blank")
                }
              >
                {/* Using FontAwesome Icon */}
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-6/12">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h5 className="uppercase text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">
                  Useful Links
                </h5>
                <ul>
                  <li className="mb-2">
                    <a
                      href="/about-us"
                      className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors duration-200"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="https://github.com/AbdullahUsama"
                      className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors duration-200"
                    >
                      Github
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="mailto:ausama.bese22seecs@seecs.edu.pk"
                      className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors duration-200"
                    >
                      Email
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/contact"
                      className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors duration-200"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              {/* You can add more link sections here if needed */}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />
        <div className="flex justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Bloom. Made with ❤️ at SEECS,
            NUST.
          </p>
        </div>
      </div>
    </footer>
  );
}
