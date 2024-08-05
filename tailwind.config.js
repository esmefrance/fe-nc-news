/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [ require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light","dark","emerald"]
  }
}

