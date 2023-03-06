/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primaryBlue: "#3994FF",
      secondaryBlue: "#5073EE",
      mediumBlue: "#151F41",
      textBlue: "#A0AFEA",
      darkBlue: "#0F162D",
      intenseBlue: "#0C1224",
      blue: "#141B38",
      white: "#FFFFFF",
    },
    fontFamily: {
      sans: ["'Inter'", "sans-serif"],
      body: ["'Exo 2'", "sans-serif"],
    },
    extend: {
        fontFamily: {
            Inter: ["'Inter'", "sans-serif"],
            Exo2: ["'Exo 2'", "sans-serif"],
        },
        colors: {
            tot: "#151F41",
        }
    },
  },

    plugins: [
        require("@tailwindcss/forms"),
    ],
};
