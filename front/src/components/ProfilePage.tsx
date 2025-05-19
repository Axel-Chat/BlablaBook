import { useEffect, useState } from "react";
import { getOneUser } from "../api/apiUser";
import { IUser } from "../@types";
import { Link } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";
import UserBookGrid from "../components/UserBookGrid";

const ProfilePage = () => {
  const [localUser, setLocalUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();

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
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

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

      <UserBookGrid
        title={`Mes livres lus : ${localUser.books_already_read.length}`}
        books={localUser.books_already_read.slice(0, 5)}
        linkTo="/books/read"
      />

      <UserBookGrid
        title={`Mes livres à lire : ${localUser.books_wish_read.length}`}
        books={localUser.books_wish_read.slice(0, 5)}
        linkTo="/books/to-read"
      />
    </div>
  );
};

export default ProfilePage;
