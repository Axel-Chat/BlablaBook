import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IBook } from "../@types";
import { useErrorHandler } from "../utils/useErrorHandler";
import { getBooksByCategory } from "../api/apiBooks";

export default function CategoryPage() {
  const [booksCategories, setBooksCategory] = useState<IBook[]>([]);
  const { handleError } = useErrorHandler();
  const { categoryId } = useParams();

  // Fetch books for the selected category whenever categoryId changes
  useEffect(() => {
    async function loadBooks() {
      try {
        const booksByCategory = await getBooksByCategory(Number(categoryId));
        setBooksCategory(booksByCategory);
      } catch (error) {
        handleError(error);
      }
    }
    loadBooks();
  }, [categoryId]);

  return (
    <div className="bg-body font-sans pt-8">
      {/* Contenu principal avec marge à gauche */}

      {/* Ajoute une marge à gauche sur les écrans md et plus grands */}
      <section className="content">
        <div>
          <div className="bg-nav-footer-50 font-sans">
            {/* Contenu principal avec marge à gauche */}{" "}
            {/* Ajoute une marge à gauche sur les écrans md et plus grands */}
            <section className="content ml-[5vw] mr-[5vw] pb-20 ">
              <h2 className="text-2xl mb-4 font-title font-bold">
                Tous Nos Livres du genre : {booksCategories[0]?.categories?.[0]?.name}
              </h2>
              <div className="book-list grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {/* loop on books */}
                {booksCategories.map((book) => (
                  <Link to={`/books/${book.id}`} key={book.id} className="block">
                    <div className="book cursor-pointer hover:shadow-lg hover:rounded-md transition-shadow text-center">
                      <img
                        src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                        alt={`${book.title}`}
                        className="h-80 w-100 object-contain mb-2 mx-auto"
                      />
                      <p className="font-body tracking-wider [word-spacing:2px] text-lg">{book.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
