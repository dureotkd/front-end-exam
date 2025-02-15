/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,html}"], // HTML 포함
  theme: {
    extend: {
      translate: {
        center: "-50%",
      },
      borderColor: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
      },
      textColor: {
        primary: "#1a202c",
        secondary: "#718096",
      },
      backgroundColor: {
        light: "#f7fafc",
        dark: "#2d3748",
      },
      margin: {
        tiny: "2px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        xxl: "60px",
        auto: "auto",
      },
      padding: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        auto: "auto",
      },
      fontSize: {
        xxs: ".5rem",
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      container: {
        center: true, // 중앙 정렬 추가
        padding: {
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
