import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue-start": "#D3E1FE",
        "custom-blue-end": "#C8D3FE",
      },
      backgroundImage: {
        "custom-blue-gradient":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
