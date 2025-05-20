import { useEffect } from "react";
import { getRandomBooks, getTopRatedBooks } from "../api/apiBooks";
import BookGrid from "../components/BookGrid";
import PresentationPage from "../components/Presentation";
import Seo from "../components/Seo";
import ThemeToggle from "../components/ThemeToggle";
import Aos from "aos";
import "aos/dist/aos.css";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => (
  useEffect(() => {
    Aos.init();
  }, []),
  (
    <>
      <Seo title="Accueil" description="Bienvenue sur BlablaBook, votre bibliothèque sociale." url={`${baseUrl}`} />
      <div className="md:hidden p-3">
        <ThemeToggle />
      </div>
      <div data-aos="zoom-out" data-aos-duration="1000">
        <PresentationPage />
      </div>
      <div data-aos="fade-up" data-aos-duration="1000">
        <BookGrid title="Livres Populaires" fetchBooks={getTopRatedBooks} />
      </div>
      <div data-aos="fade-down" data-aos-duration="1200">
        <BookGrid title="À Découvrir" fetchBooks={getRandomBooks} />
      </div>
    </>
  )
);

export default HomePage;
