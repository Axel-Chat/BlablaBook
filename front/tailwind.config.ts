import { type Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class", // important
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        palette: {
          body: "var(--color-body)",
          sidebar: "var(--color-sidebar)",
          header: "var(--color-header)",
          placeholder: "var(--color-placeholder)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
