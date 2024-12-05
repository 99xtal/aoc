import { Source_Code_Pro } from "next/font/google";
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
        background: "#0f0f23",
        green: "#00cc00",
        greenhighlight: "#99ff99",
        greendim: "#009900",
        white: "#cccccc",
      },
      dropShadow: {
        'g': '0 0 2px #00cc00',
        'gh': '0 0 2px #99ff99',
        'gd': '0 0 2px #009900',
      },
    },
  },
  plugins: [],
} satisfies Config;
