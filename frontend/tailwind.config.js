// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans all your React files
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

//dark mode changes:

// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans all your React files
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette (optional but recommended for better dark mode theming)
        primary: {
          light: "#4ade80", // Light green
          DEFAULT: "#22c55e", // Green
          dark: "#15803d", // Dark green
        },
        secondary: {
          light: "#818cf8", // Light indigo
          DEFAULT: "#6366f1", // Indigo
          dark: "#4f46e5", // Dark indigo
        },
        // Add more custom colors as needed
      },
      transitionProperty: {
        height: "height",
        // Add more transition properties if needed
      },
    },
  },
  plugins: [
    // Add Tailwind CSS plugins here if needed
    // For example, forms, typography, etc.
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
