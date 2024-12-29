export default function Footer() {
  return (
    <footer className="bg-blueGray-900 text-black py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between">
          {/* Contact Section */}
          <div className="w-full lg:w-6/12 mb-8 lg:mb-0">
            <h4 className="text-4xl font-bold mb-4">Let's Keep in Touch!</h4>
            <p className="text-lg text-blueGray-400">
              Stay connected with Bloom.
            </p>
            <div className="mt-6 flex space-x-4">
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full hover:bg-pink-100"
                type="button"
                onClick={() => window.open("https://www.nba.com", "_blank")}
              >
                <i className="fab fa-dribbble"></i>
              </button>
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full hover:bg-blueGray-200"
                type="button"
                onClick={() =>
                  window.open("https://github.com/AbdullahUsama", "_blank")
                }
              >
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-6/12">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h5 className="uppercase text-blueGray-400 text-sm font-semibold mb-2">
                  Useful Links
                </h5>
                <ul>
                  <li className="mb-2">
                    <a
                      href="/about-us"
                      className="text-blueGray-300 hover:text-blueGray-100"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="https://github.com/AbdullahUsama"
                      className="text-blueGray-300 hover:text-blueGray-100"
                    >
                      Github
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="mailto:ausama.bese22seecs@seecs.edu.pk"
                      className="text-blueGray-300 hover:text-blueGray-100"
                    >
                      Email
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="/contact"
                      className="text-blueGray-300 hover:text-blueGray-100"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="my-8 border-blueGray-700" />
        <div className="flex justify-center">
          <p className="text-blueGray-400 text-sm">
            &copy; {new Date().getFullYear()} Bloom. Made with ❤️ at SEECS,
            NUST.
          </p>
        </div>
      </div>
    </footer>
  );
}
