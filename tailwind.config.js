/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "valentine",
      "retro",
      "dracula",
      "cmyk",
      "sunset",
      "cyberpunk",
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
          error: "#ff6868",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
