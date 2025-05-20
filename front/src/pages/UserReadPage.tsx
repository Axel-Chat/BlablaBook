import { useEffect, useState } from "react";
import { getOneUser } from "../api/apiUser";
import { IUser } from "../@types";
import { Link } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";
import UserBookGrid from "../components/UserBookGrid";

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
        setLocalUser(userData);
      } catch (err) {
        setError("Erreur lors du chargement des livres lus.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Chargement des livres lus...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!localUser) return null;

  return (
    <section className="content pt-10 pb-20">
      <Link
        to="/profile"
        className="block text-gray-800 hover:text-yellow-700 hover:underline mb-2 font-body tracking-widest dark:text-yellow-500 px-4 sm:px-10"
      >
        ← Retour au profil
      </Link>
      <UserBookGrid title={`Mes livres lus : ${localUser.books_already_read.length}`} books={localUser.books_already_read} />
    </section>
  );
};

export default UserReadPage;
