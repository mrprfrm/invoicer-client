const { transparent } = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        'input[type="date"]::-webkit-calendar-picker-indicator': {
          display: "none",
        },
      });
    }),
    plugin(function ({ addComponents }) {
      addComponents({
        ".branded-text": {
          background:
            "linear-gradient(to right, rgba(50,97,124,1), rgba(59,115,147,1))",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        "branded-border": {
          "border-image":
            "linear-gradient(to right, rgba(50,97,124,1), rgba(59,115,147,1))",
        },
        ".branded-bg": {
          background:
            "linear-gradient(to right, rgba(50,97,124,1), rgba(59,115,147,1))",
        },
      });
    }),
  ],
};
