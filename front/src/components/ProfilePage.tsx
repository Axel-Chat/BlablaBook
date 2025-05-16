import { useEffect, useState } from "react";
import { getOneUser } from "../api/apiUser";
import type { IUser } from "../@types/index.d.ts";
import { Link } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";

const ProfilePage = () => {
  const [localUser, setLocalUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message if any

  const { user } = useAuthStore();

  useEffect(() => {
    // Fetch user data when the component mounts

    async function fetchUser() {
      if (!user?.id) {
        // If user is not logged in
        setError("Utilisateur non connecté");
        setLoading(false);
        return;
      }

      try {
        const userData = await getOneUser();
        if (!userData) {
          setError("Impossible de charger le profil.");
          return;
        }
        setLocalUser(userData);
      } catch (err) {
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Conditional rendering based on loading or error state
  if (loading) return <p className="text-center">Chargement de votre profil...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!localUser) return null;

  return (
    <div className="pt-8 content ml-[5vw] mr-[5vw] pb-10 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold font-title">{user?.name}</h1>
        <Link
          to={`/user/settings`}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-400"
          aria-label="Modifier le profil"
        >
          Modifier le profil
        </Link>
      </div>

      {/* Livres lus */}
      <section className="pb-4 md:pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold font-title">
            <Link
              to="/books/read"
              className="block text-gray-800 hover:underline dark:text-placeholder"
              aria-label="Mes livres lus"
            >
              Mes livres lus : {localUser.books_already_read.length}
            </Link>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {localUser.books_already_read.slice(0, 5).map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="block"
              aria-label={`Voir les détails du livre ${book.title}`}
            >
              <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                <img
                  src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                  alt={book.title}
                  className="h-80 w-full object-contain mb-2 mx-auto"
                />
                <p className="text-center text-lg font-body tracking-wider">{book.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Livres à lire */}
      <section className="pb-20 md:pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-title">
            <Link
              to="/books/to-read"
              className="block text-gray-800 hover:underline dark:text-placeholder"
              aria-label="Mes livres à lire"
            >
              Mes livres à lire : {localUser.books_wish_read.length}
            </Link>
          </h2>
        </div>

        <div className="book-list grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {localUser.books_wish_read.slice(0, 5).map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="block"
              aria-label={`Voir les détails du livre ${book.title}`}
            >
              <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                <img
                  src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                  alt={book.title}
                  className="h-80 w-full object-contain mb-2 mx-auto"
                />
                <p className="text-center text-lg font-body tracking-wider">{book.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
