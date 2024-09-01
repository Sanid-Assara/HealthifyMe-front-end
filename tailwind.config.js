/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "arrow-right": "2.5rem", // Space for the arrow
      },
      colors: {
        "arrow-color": "#00FF00", // Customize the arrow color
      },
    },
  },
  daisyui: {
    themes: [
      {
        healthifyMe: {
          primary: "#4d7e3e",
          secondary: "#D5ED9F",
          accent: "#FF9100",
          neutral: "#233a29",
          "neutral-content": "#FFF6E9",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          info: "#7bd3ea",
          success: "#65b741",
          warning: "#facc15",
          error: "#C53030",
        },
      },
      "light",
      "dark",
      "bumblebee",
      "emerald",
      "corporate",
      "retro",
      "valentine",
      "dracula",
      "garden",
      "pastel",
      "lemonade",
      "night",
      "nord",
      "sunset",
    ],
  },
  plugins: [
    require("daisyui"),
    function ({ addComponents }) {
      addComponents({
        ".dropdown-arrow": {
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            right: "0.5rem",
            transform: "translateY(-50%)",
            width: 0,
            height: 0,
            borderLeft: "0.5rem solid transparent",
            borderRight: "0.5rem solid transparent",
            borderTop: "0.5rem solid #000", // Customize this color to match your theme
            pointerEvents: "none",
          },
        },
      });
    },
  ],
};
