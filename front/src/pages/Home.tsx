import { getRandomBooks, getTopRatedBooks } from "../api/apiBooks";
import BookGrid from "../components/BookGrid";
import PresentationPage from "../components/Presentation";
import Seo from "../components/Seo";
import ThemeToggle from "../components/ThemeToggle";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => (
  <>
    <Seo
      title="Accueil"
      description="Bienvenue sur BlablaBook, votre bibliothèque sociale."
      url={`${baseUrl}`}
    />
    <div className="md:hidden p-3">
      <ThemeToggle />
    </div>
    <PresentationPage />
    <BookGrid title="Livres Populaires" fetchBooks={getTopRatedBooks} />
    <BookGrid title="Nos recommendations" fetchBooks={getRandomBooks} />
  </>
);

export default HomePage;
