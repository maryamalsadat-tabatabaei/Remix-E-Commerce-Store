import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-blur-in": {
          from: {
            opacity: "0",
            filter: "blur(1rem)",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-slide-in": {
          from: {
            opacity: "0",
            transform: "translateY(-2rem)",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(1rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "fade-slide-down": {
          from: {
            opacity: "0",
            transform: "translateY(-1rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "transfer-slide-right": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-50%)",
          },
        },
      },

      animation: {
        "fade-blur-in": "fade-blur-in 1s ease-out forwards",
        "fade-slide-in": "fade-slide-in 1s ease-out forwards",
        "fade-slide-up": "fade-slide-up 1.5s ease-out forwards",
        "fade-slide-down": "fade-slide-down 1.5s ease-out forwards",
        "transfer-slide-right": "transfer-slide-right 15s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
} satisfies Config;
