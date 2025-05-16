import { useEffect, useState } from "react";
import { getOneUser } from "../api/apiUser";
import type { IUser } from "../@types/index.d.ts";
import { Link } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";

const UserReadPage = () => {
  const { user } = useAuthStore();
  const [localUser, setLocalUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!user?.id) {
        setError("Utilisateur non connecté");
        setLoading(false);
        return;
      }

      try {
        const userData = await getOneUser();
        if (!userData) {
          setError("Impossible de charger les livres lus.");
          return;
        }
        setLocalUser(userData);
      } catch (err) {
        setError("Erreur lors du chargement des livres lus.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [user]);

  if (loading)
    return <p className="text-center mt-10">Chargement des livres lus...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!localUser) return null;

  return (
    <section className="content ml-[5vw] mr-[5vw] pt-10 pb-20">
      <Link
        to="/profile"
        className="block text-gray-800 hover:text-yellow-700 hover:underline mb-2 font-body tracking-widest dark:text-yellow-500"
      >
        ← Retour au profil
      </Link>
      <h1 className="text-3xl font-bold font-title mb-6">
        Mes livres lus : {localUser.books_already_read.length}
      </h1>

      {localUser.books_already_read.length === 0 ? (
        <p className="text-lg font-body">Tu n’as encore lu aucun livre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {localUser.books_already_read.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="block">
              <div className="book cursor-pointer hover:shadow-lg hover:rounded-md transition-shadow text-center">
                <img
                  src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                  alt={book.title}
                  className="h-80 w-full object-contain mb-2 mx-auto"
                />
                <p className="text-lg font-body tracking-wider">{book.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-10"></div>
    </section>
  );
};

export default UserReadPage;
