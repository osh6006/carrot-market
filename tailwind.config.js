/** @type {import('tailwindcss').Config} */
module.exports = {
  // 페이지 안에 있는 모든 파일에 적용
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*..{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
