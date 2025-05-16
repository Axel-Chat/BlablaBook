import { getRandomBooks, getTopRatedBooks } from "../api/apiBooks";
import BookGrid from "../components/BookGrid";
import PresentationPage from "../components/Presentation";

const HomePage = () => (
  <>
    <PresentationPage />
    <BookGrid title="Livres Populaires" fetchBooks={getTopRatedBooks} />
    <BookGrid title="Nos recommendations" fetchBooks={getRandomBooks} />
  </>
);

export default HomePage;
