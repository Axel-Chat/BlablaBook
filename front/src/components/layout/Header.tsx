import { Link,useLocation } from "react-router-dom";
import { useAuthStore } from "../../utils/store/useAuthStore";
import SearchBar from "./SearchBar";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <div className="flex ml-0 sticky top-0 z-10">
      <header className="bg-header flex items-center gap-4 justify-between p-4 left-0 w-full md:ml-64 md:px-10 ml:px-6 lg:px-10 backdrop-blur-sm transition-all font-title">
        <div className=" flex items-center md:hidden ">
          <img src="/img/logo/blablabook.webp" alt="BlaBlaBook" className="h-[6vw]  " />
          <h1 className="text-lg font-black font-title ml-2 hidden xs:inline">BlaBlaBook</h1>
        </div>

        <SearchBar />

        <nav className="hidden md:flex gap-6 ml:gap-2">
        <Link
            to="/"
            aria-label="Accueil"
            className={`hover:text-yellow-700 dark:hover:text-yellow-500 ${
              isActive("/") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
            }`}
          >
            <i className="fa-solid fa-house-chimney text-xl ml:text-base"></i>
            <span className="whitespace-nowrap hidden ml:inline"> Accueil</span>
          </Link>
          <Link
            to="/library"
            aria-label="Bibliothèque"
            className={`hover:text-yellow-700 dark:hover:text-yellow-500 ${
              isActive("/library") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
            }`}
          >
            <i className="fa-solid fa-book text-xl ml:text-base"></i>
            <span className="whitespace-nowrap hidden ml:inline"> Bibliothèque</span>
          </Link>

          {!user ? (
        <Link
        to="/auth"
        aria-label="Mon compte"
        className={`hover:text-yellow-700 dark:hover:text-yellow-500 ${
          isActive("/auth") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
        }`}
      >
        <i className="fa-solid fa-user text-xl ml:text-base"></i>
        <span className="hidden ml:inline"> Mon compte</span>
      </Link>
          ) : (
            <Link
              to="/profile"
              aria-label={`Voir le profil de ${user.name}`}
              className={`hover:text-yellow-700 dark:hover:text-yellow-500 ${
                isActive("/profile") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
              }`}
            >
              <i className="fa-solid fa-user text-xl"></i>
              <span className="hidden ml:inline"> {user.name}</span>
            </Link>
          )}
          <ThemeToggle />
        </nav>

        {/* Categories search */}
        <Link to="/categories" className="block md:hidden pr-4 " aria-label="Voir les catégories">
          <i className="fa-solid fa-sliders text-2xl text-placeholder"></i>
        </Link>
      </header>
    </div>
  );
};

export default Header;
