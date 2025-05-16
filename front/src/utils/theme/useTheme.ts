import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const useTheme = () => {
  const theme = useAuthStore((state) => state.theme);
  const setTheme = useAuthStore((state) => state.setTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Si aucun thème défini, on initialise avec les préférences système
    if (!theme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      root.classList.add(initialTheme);
      setTheme(initialTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, setTheme]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";

    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
