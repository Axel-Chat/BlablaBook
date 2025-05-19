import { Link } from "react-router-dom";
import { useAuthStore } from "../../utils/store/useAuthStore";
import SearchBar from "./SearchBar";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex ml-0 sticky top-0 z-10">
      <header className="bg-header flex items-center gap-4 justify-between p-4 left-0 w-full md:ml-64 md:px-10 ml:px-6 lg:px-10 backdrop-blur-sm transition-all font-title">
        <div className=" flex items-center md:hidden ">
          <img src="/img/logo/blablabook.webp" alt="BlaBlaBook" className="h-[6vw]  " />
          <h1 className="text-lg font-black font-title">BlaBlaBook</h1>
        </div>

        <SearchBar />

        <nav className="hidden md:flex gap-6 ml:gap-2">
          <Link className="hover:text-yellow-700 dark:hover:text-yellow-500" to="/" aria-label="Accueil">
            <i className="fa-solid fa-house-chimney text-xl ml:text-base"></i>
            <span className="whitespace-nowrap hidden ml:inline"> Accueil</span>
          </Link>
          <Link className="hover:text-yellow-700 dark:hover:text-yellow-500" to="/library" aria-label="Bibliothèque">
            <i className="fa-solid fa-book text-xl ml:text-base"></i>
            <span className="whitespace-nowrap hidden ml:inline"> Bibliothèque</span>
          </Link>

          {!user ? (
            <Link className="hover:text-yellow-700 dark:hover:text-yellow-500" to="/auth" aria-label="Mon compte">
              <i className="fa-solid fa-user text-xl ml:text-base"></i>
              <span className="hidden ml:inline"> Mon compte</span>
            </Link>
          ) : (
            <Link
              className="hover:text-yellow-700 dark:hover:text-yellow-500"
              to="/profile"
              aria-label={`Voir le profil de ${user.name}`}
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
