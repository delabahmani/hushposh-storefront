import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#333333",
        brown: "#463F3A",
        lightbrown: "#8A817C",
        lightgray: "#BCB8B1",
        offwhite: "#F4F3EE",
        coral: "#E0AFA0",
      }
    },
  },
  plugins: [],
};
export default config;
