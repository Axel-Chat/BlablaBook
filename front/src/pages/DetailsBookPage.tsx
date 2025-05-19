import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBook } from "../@types";
import { getBooksByCategory, getOneBook } from "../api/apiBooks";
import {
  addToMyReadLibrary,
  addToWishRead,
  deleteToMyReadLibrary,
  deleteToWishRead,
} from "../api/apiUser";
import { useErrorHandler } from "../utils/useErrorHandler";
import { toastSuccess, toastInfo, toastWarning } from "../utils/toast/toaster";
import { useAuthStore } from "../utils/store/useAuthStore";
import BookGrid from "../components/BookGrid";
import Seo from "../components/Seo";
import ReviewSection from "../components/review";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * @component BookDetail
 * @description Displays detailed information about a specific book and allows the user to manage their read/to-read status.
 */
const DetailsBookPage = () => {
  const { user } = useAuthStore();
  const userId = user?.id;
  const { bookId } = useParams();
  const numericBookId = Number(bookId);
  const [book, setBook] = useState<IBook>();
  const [isRead, setIsRead] = useState(false);
  const [toRead, setToRead] = useState(false);
  const { handleError } = useErrorHandler();

  /**
   * @function handleAddRead
   * @description Adds the current book to the user's "read" list. If the book is in the wishlist ("to-read"), it will be removed from there.
   * Displays a warning if the user is not authenticated.
   */
  const handleAddRead = async () => {
    if (!userId) {
      toastWarning(`Vous devez être connecté pour pouvoir ajouter un livre à une de vos listes.
   <div class="mt-4 text-center">
     <a href="/auth" class="text-blue-600 underline font-semibold hover:text-blue-800 transition">
       Se connecter
     </a>
   </div>`);
      return;
    }

    try {
      await addToMyReadLibrary(numericBookId);

      if (toRead) {
        await handleRemoveWishRead();
      }

      toastSuccess(`Le livre a bien été ajouté à la liste "lu"`);
      setIsRead(true);
      setToRead(false);
    } catch (error) {
      handleError(error);
    }
  };

  /**
   * @function handleRemoveRead
   * @description Removes the current book from the user's "read" list.
   * Displays a notification on success, and handles errors gracefully.
   */
  const handleRemoveRead = async () => {
    try {
      const success = await deleteToMyReadLibrary(numericBookId);

      if (!success) {
        throw new Error("Impossible de retirer le livre de la liste 'lu'.");
      }

      toastInfo(`Le livre a été enlevé de la liste "lu"`);
      setIsRead(false);
    } catch (error) {
      handleError(error);
    }
  };

  /**
   * @function handleWishRead
   * @description Adds the current book to the user's "to-read" list.
   * If the book is already in the "read" list, it will be removed from there.
   * Requires the user to be authenticated.
   */
  const handleWishRead = async () => {
    if (!userId) {
      toastWarning(`Vous devez être connecté pour pouvoir ajouter un livre à une de vos listes.
   <div class="mt-4 text-center">
     <a href="/auth" class="text-blue-600 underline font-semibold hover:text-blue-800 transition">
       Se connecter
     </a>
   </div>`);
      return;
    }

    try {
      await addToWishRead(numericBookId);

      if (isRead) {
        await handleRemoveRead();
      }

      toastSuccess(`Le livre a bien été ajouté à la liste "à lire"`);
      setToRead(true);
      setIsRead(false);
    } catch (error) {
      handleError(error);
    }
  };

  /**
   * @function handleRemoveWishRead
   * @description Removes the current book from the user's "to-read" (wishlist) list.
   * Displays a notification on success, and handles errors gracefully.
   */
  const handleRemoveWishRead = async () => {
    try {
      const success = await deleteToWishRead(numericBookId);

      if (!success) {
        throw new Error("Impossible de retirer le livre de la liste 'à lire'.");
      }

      toastInfo(`Le livre a été enlevé de la liste "à lire"`);
      setToRead(false);
    } catch (error) {
      handleError(error);
    }
  };

  /**
   * Load book data and user's reading status when `bookId` or `userId` changes.
   */
  useEffect(() => {
    const loadData = async () => {
      if (!bookId) return;

      try {
        const newBook = await getOneBook(numericBookId);
        setBook(newBook);

        // Check if the current user has marked the book as read
        const hasRead = newBook.users_has_read.some(
          (user) => user.id === userId
        );

        // Check if the current user wants to read the book
        const wantsToRead = newBook.users_need_to_read.some(
          (user) => user.id === userId
        );

        setIsRead(hasRead);
        setToRead(wantsToRead);
      } catch (error) {
        handleError(error);
      }
    };

    loadData();
  }, [bookId, userId]);

  // check if the book exists
  if (!book) {
    return (
      <div className="text-center text-red-600 bg-red-100 p-4 rounded-md shadow-md">
        Livre non trouvé
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Détail d'un livre"
        description="Apprenez en davantage sur un livre"
        url={`${baseUrl}/books/${bookId}`}
      />
      <div className="bg-body flex flex-col p-4 items-center sm:flex-col ml:flex-row lg:ml-0 xl:ml-64 md:p-8 md:gap-8 mt-5 font-body tracking-wider [word-spacing:2px]">
        <img
          src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
          alt=""
          role="presentation"
          className="w-60 mr-5 h-auto mb-4 "
        />

        <div className="text-sm md:text-base max-w-xl">
          <p>
            <span className="font-bold font-title text:2xl">Par :</span>{" "}
            {/* Join author names if there are multiple */}
            {book.authors.map((auth) => auth.name).join(", ")}
          </p>

          <h1 className="text-xl font-title font-bold mb-2">{book.title}</h1>

          <p>
            <span className="font-bold font-title">Catégorie :</span>{" "}
            {/* Join category names if there are multiple */}
            {book.categories.map((cat) => cat.name).join(", ")}
          </p>

          <p className="mb-2">
            <span className="font-bold font-title">Date de publication</span> :{" "}
            {book.published}
          </p>

          <p className="font-bold mt-4 mb-1 font-title text-lg">
            Description :
          </p>
          <p>{book.description}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-4">
            {/* "Read" button
              - Changes color based on state (green if selected)
              - Uses different handlers depending on current state
              - Includes appropriate icon based on status */}
            <button
              onClick={!isRead ? handleAddRead : handleRemoveRead}
              className={`flex items-center gap-2 ${
                isRead && !toRead
                  ? `bg-green-300 hover:bg-green-200 dark:bg-green-600 dark:hover:bg-green-400 ${!toRead}`
                  : "bg-gray-300 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-400"
              }  rounded justify-center w-40 py-2 cursor-pointer`}
            >
              <i
                className={`${
                  isRead && !toRead
                    ? "fa-solid fa-square-check"
                    : "fa-solid fa-square-xmark"
                }`}
              ></i>
              <span>Lu</span>
            </button>

            {/* "To Read" button
              - Changes color based on state (green if selected)
              - Uses different handlers depending on current state */}
            <button
              onClick={!toRead ? handleWishRead : handleRemoveWishRead}
              className={`flex items-center gap-2 ${
                toRead && !isRead
                  ? "bg-green-300 hover:bg-green-200 dark:bg-green-600 dark:hover:bg-green-400"
                  : "bg-gray-300 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-400"
              } rounded justify-center w-40 py-2 cursor-pointer `}
            >
              <i className="fa-solid fa-book-open-reader"></i>
              <span>À Lire</span>
            </button>
          </div>
        </div>
      </div>
      {/* Review */}
      <ReviewSection />
      {/* <RecommendedBooks /> */}
      <BookGrid
        title="Ces livres peuvent aussi vous plaire"
        fetchBooks={() => getBooksByCategory(book.categories[0].id)}
        currentBookId={book.id}
      />
    </>
  );
};

export default DetailsBookPage;
