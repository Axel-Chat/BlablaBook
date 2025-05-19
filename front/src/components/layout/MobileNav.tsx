import { Link,useLocation } from "react-router-dom";
import { useAuthStore } from "../../utils/store/useAuthStore";

const MobileNav = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;


  return (
    <div className="fixed bottom-0 left-0 w-full bg-body border-t border-placeholder flex justify-around p-4 z-10 rounded-t md:hidden font-title">
      <Link
        to="/"
        className={`flex flex-col items-center text-sm hover:text-yellow-700 dark:hover:text-yellow-500 ${
          isActive("/") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
        }`}
      >
        <i className="fa-solid fa-house-chimney"></i>
        Accueil
      </Link>

      <Link
        to="/library"
        className={`flex flex-col items-center text-sm hover:text-yellow-700 dark:hover:text-yellow-500 ${
          isActive("/library") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
        }`}
      >
        <i className="fa-solid fa-book"></i>
        Bibliothèque
      </Link>

      {!user ? (
        <Link
          to="/auth"
          className={`flex flex-col items-center text-sm hover:text-yellow-700 dark:hover:text-yellow-500 ${
            isActive("/auth") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
          }`}
        >
          <i className="fa-solid fa-user"></i>
          Mon compte
        </Link>
      ) : (
        <Link
          to="/profile"
          className={`flex flex-col items-center text-sm hover:text-yellow-700 dark:hover:text-yellow-500 ${
            isActive("/profile") ? "text-yellow-700 dark:text-yellow-500 font-bold" : ""
          }`}
        >
          <i className="fa-solid fa-user"></i>
          {user.name}
        </Link>
      )}
    </div>
  );
};

export default MobileNav;
