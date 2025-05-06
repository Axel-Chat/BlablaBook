import { useState, useEffect } from "react";
import { IBooks } from "../@types";
import { getAllBooks } from "../api/apiBooks";
import { Link } from "react-router-dom";
import { useErrorHandler } from "../utils/useErrorHandler";

const Library = () => {
  const [books, setBooks] = useState<IBooks>([]);
  const { handleError } = useErrorHandler();

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
    <div className="bg-body font-sans pt-8">
      {/* Contenu principal avec marge à gauche */}
      <div className="">
        {/* Ajoute une marge à gauche sur les écrans md et plus grands */}
        <section className="content">
          <div>
            <div className="bg-nav-footer-50 font-sans">
              {/* Contenu principal avec marge à gauche */}{" "}
              {/* Ajoute une marge à gauche sur les écrans md et plus grands */}
              <section className="content ml-[5vw] mr-[5vw]">
                <h2 className="text-xl mb-4 font-bold">Tous Nos Livres</h2>
                <div className="book-list grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {/* loop on books */}
                  {books.map((book) => (
                    <Link to={`/books/${book.id}`} key={book.id} className="block">
                      <div className="book cursor-pointer hover:shadow-lg hover:rounded-md transition-shadow text-center">
                        <img
                          src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                          alt={`${book.title}`}
                          className="h-80 w-100 object-contain mb-2 mx-auto"
                        />
                        <p>{book.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Library;
