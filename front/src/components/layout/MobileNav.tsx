import { Link } from "react-router-dom";
import { useAuthStore } from "../../utils/store/useAuthStore";

const MobileNav = () => {
  const { user } = useAuthStore();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-body border-t border-placeholder flex justify-around p-4 z-10 rounded-t md:hidden font-title ">
      <Link to="/" className="hover:text-blue-600 flex flex-col items-center text-sm dark:hover:text-yellow-500">
        <i className="fa-solid fa-house-chimney"></i> Accueil
      </Link>
      <Link to="/library" className="hover:text-blue-600 flex flex-col items-center text-sm dark:hover:text-yellow-500">
        <i className="fa-solid fa-book"></i> Bibliothèque
      </Link>
      {!user ? (
        <Link to="/auth" className="hover:text-blue-600 flex flex-col items-center text-sm dark:hover:text-yellow-500">
          <i className="fa-solid fa-user"></i> Mon compte
        </Link>
      ) : (
        <Link to="/profile" className="hover:text-blue-600 flex flex-col items-center text-sm dark:hover:text-yellow-500">
          <i className="fa-solid fa-user"></i> {user.name}
        </Link>
      )}
    </div>
  );
};

export default MobileNav;
