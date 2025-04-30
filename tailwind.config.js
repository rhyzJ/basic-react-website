/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,ts,css,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#512260", // purple
        secondary: "#008080", // teal
        accent: "#eeba2b", // yellow/gold
        text: "#333333", // dark gray
        subtext: "#555555", // light gray
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // main font
        heading: ["Montserrat", "sans-serif"], // font for headings/special
      },
    },
  },
  plugins: [],
};
