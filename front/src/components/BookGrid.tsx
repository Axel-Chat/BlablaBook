import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooks } from "../@types";
import { useErrorHandler } from "../utils/useErrorHandler";
import StarRatingStatic from "./review/StarRating";
type BookGridProps = {
  title: string;
  fetchBooks: () => Promise<IBooks>;
  currentBookId?: number;
};
const BookGrid = ({ title, fetchBooks, currentBookId }: BookGridProps) => {
  const [bookList, setBookList] = useState<IBooks>([]);
  const { handleError } = useErrorHandler();
  useEffect(() => {
    async function loadBooks() {
      try {
        const allBooks = await fetchBooks();
        const filteredBooks = currentBookId
          ? allBooks.filter((book) => book.id !== currentBookId).splice(0, 5)
          : allBooks;
        setBookList(filteredBooks);
      } catch (error) {
        handleError(error);
      }
    }
    loadBooks();
  }, [fetchBooks, currentBookId]);
  return (
    <section className="content ml-[5vw] mr-[5vw] py-10">
      <h2 className="text-3xl mb-4 font-bold font-title">{title}</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {bookList.map((book) => {
          // Safety check to avoid errors with averageRating
          const rating =
            book.averageRating !== undefined && book.averageRating !== null
              ? parseFloat(String(book.averageRating))
              : null;

          return (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="block"
              aria-label={`Voir les détails du livre ${book.title}`}
            >
              <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                <img
                  src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                  alt=""
                  role="presentation"
                  className="h-80 w-full object-contain mb-2 mx-auto"
                  width={160}
                  height={320}
                  loading="lazy"
                />
                <p className="text-center text-lg font-body [word-spacing:2px] tracking-wider ">{book.title}</p>
              </div>
              <div className="mt-2 min-h-[28px] flex justify-center">
                {rating !== null ? (
                  <StarRatingStatic rating={rating} showValue />
                ) : (
                  <p className="text-sm text-gray-500 italic">Pas encore noté</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default BookGrid;
