import { Link } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";

const PresentationPage = () => {
  const { user, token } = useAuthStore();
  const isAuthenticated = !!user && !!token;

  return (
    <>
      <section className="py-12 font-body px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-title font-extrabold text-gray-900 mb-4 dark:text-placeholder">
            Bienvenue sur BlaBlaBook
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed dark:text-placeholder">
            BlaBlaBook est une plateforme communautaire dédiée aux passionnés de lecture. Ici, vous pouvez explorer une
            large sélection de livres, sauvegarder ceux que vous souhaitez lire ou ceux que vous avez déjà lu !
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4 dark:text-placeholder">
            Que vous soyez fan de fantasy, amateur de romans policiers ou curieux de découvertes littéraires, notre
            bibliothèque s’adapte à tous les goûts.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4 dark:text-placeholder">
          <Link
            to="/library"
            className="rounded px-6 py-4 bg-gray-800 font-semibold text-lg text-white text-center shadow-sm transition-all duration-300 hover:bg-gray-600 hover:shadow-gray-400 cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-400"
            aria-label="Explorer la bibliothèque"
          >
            Explorer la bibliothèque
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/auth"
              className="rounded px-6 py-4 bg-white font-semibold text-lg text-gray-700 text-center shadow-sm transition-all duration-300 hover:bg-gray-300 hover:shadow-gray-400 cursor-pointer dark:bg-gray-200 dark:hover:bg-gray-400"
              aria-label="Se connecter ou s'inscrire"
            >
              Se connecter / S'inscrire
            </Link>
          ) : (
            <Link
              to="/profile"
              className="rounded px-6 py-4 bg-white font-semibold text-lg text-gray-700 text-center shadow-sm transition-all duration-300 hover:bg-gray-300 hover:shadow-gray-400 cursor-pointer dark:bg-gray-200 dark:hover:bg-gray-400"
              aria-label="Voir mon profil"
            >
              Voir mon profil
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default PresentationPage;
