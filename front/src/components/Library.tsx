import { useState, useEffect } from "react";
import { IBooks } from "../@types";
import { getAllBooks } from "../api/apiBooks";
import { Link } from "react-router-dom";
import { useErrorHandler } from "../utils/useErrorHandler";
import AOS from "aos";
import "aos/dist/aos.css";

const Library = () => {
  const [books, setBooks] = useState<IBooks>([]);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        // console.error("Erreur lors de la récupération des livres", error);
        handleError(error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <>
      {/* Ajoute une marge à gauche sur les écrans md et plus grands */}
      {/* Contenu principal avec marge à gauche */} {/* Ajoute une marge à gauche sur les écrans md et plus grands */}
      <section className="content ml-[5vw] mr-[5vw] bg-body pb-20 md:pb-8">
        <h2 className="text-3xl mt-8 mb-4 font-bold font-title">Tous Nos Livres</h2>
        <div className="book-list grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 ">
          {/* loop on books */}
          {books.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} className="block" data-aos="flip-right">
              <div className="book cursor-pointer hover:shadow-lg hover:rounded-md transition-shadow text-center">
                <img
                  src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                  alt={`Couverture du livre : ${book.title}`}
                  className="h-80 w-100 object-contain mb-2 mx-auto"
                />
                <p className="text-center text-lg font-body [word-spacing:2px] tracking-wider">{book.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Library;
