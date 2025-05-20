import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooks } from "../@types";
import { useErrorHandler } from "../utils/useErrorHandler";
import StarRatingStatic from "./review/StarRating";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Aos from "aos";
import "aos/dist/aos.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type BookGridProps = {
  title: string;
  fetchBooks: () => Promise<IBooks>;
  currentBookId?: number;
};

const BookGrid = ({ title, fetchBooks, currentBookId }: BookGridProps) => {
  const [bookList, setBookList] = useState<IBooks>([]);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    Aos.init();
    async function loadBooks() {
      try {
        const allBooks = await fetchBooks();
        const filteredBooks = currentBookId ? allBooks.filter((book) => book.id !== currentBookId).splice(0, 5) : allBooks;
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
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={40}
        slidesPerView={5}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          300: { slidesPerView: 1 },
          550: { slidesPerView: 2 },
          768: { slidesPerView: 1 },
          850: { slidesPerView: 2 },
          1110: { slidesPerView: 3 },
          1350: { slidesPerView: 4, spaceBetween: 200 },
          1550: { slidesPerView: 5 },
        }}
        style={
          {
            "--swiper-pagination-color": "#FFBA08",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-horizontal-gap": "8px",
            "--swiper-button-next-backgroundSize": "40px",
          } as React.CSSProperties
        }
        className="!pb-10" // Ajoute de l'espace sous le slider pour les flèches/pagination
      >
        {bookList.map((book) => {
          // Safety check to avoid errors with averageRating
          const rating = book.averageRating !== undefined && book.averageRating !== null ? parseFloat(String(book.averageRating)) : null;
          return (
            <SwiperSlide key={book.id}>
              <Link to={`/books/${book.id}`} className="block w-60 mx-auto py-2" aria-label={`Voir les détails du livre ${book.title}`}>
                <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                  <img
                    src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                    alt={`Couverture de ${book.title}`}
                    className="h-80 w-full object-contain mb-2 mx-auto"
                    width={160}
                    height={320}
                    loading="lazy"
                  />
                  <p className="text-center text-lg font-body tracking-wider">{book.title}</p>
                </div>
                <div className="mt-2 min-h-[28px] flex justify-center">
                  {rating !== null ? <StarRatingStatic rating={rating} showValue /> : <p className="text-sm text-gray-500 italic">Pas encore noté</p>}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default BookGrid;
