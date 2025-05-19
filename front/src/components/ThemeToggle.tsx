import useTheme from "../utils/theme/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg cursor-pointer text-xl transition text-black dark:text-placeholder dark:hover:text-yellow-500" aria-label="Bouton pour passer en mode sombre/clair"
    >
      <i
        className={`fa-solid transition-transform duration-300 ${
          theme === "light" ? "fa-moon rotate-0" : "fa-sun rotate-180"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;