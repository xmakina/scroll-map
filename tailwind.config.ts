import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#161617",
        secondary: "#fffcf2",
        accent: "#D1AC00",
        danger: "#C2847A",
        alternate: "#848586",
      },
    },
  },
  plugins: [],
} satisfies Config;
