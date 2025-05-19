import { IReviewApiResponse, INewReviewPayload, IReview } from "../@types/review";
import { authFetch } from "../utils/authFetch";
import { IError } from "../@types/auth";
const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Creates a new review for a book.
 *
 * @param {number} bookId - The ID of the book to review.
 * @param {INewReviewPayload} payload - The review data to be sent.
 * @returns {Promise<IReview>} - A promise that resolves to the created review.
 * @throws {Error} - If the request fails, throws an error with the API error message.
 */
export const createReview = async (bookId: number, payload: INewReviewPayload): Promise<IReview> => {
  const res = await authFetch(`${API_URL}/user/books/${bookId}/review`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error: IError = await res.json();
    throw new Error(error.message || "Erreur lors de l'envoi de l'avis");
  }

  const data = await res.json();
  return data.review;
};

/**
 * Updates an existing review for a book.
 *
 * @param {number} bookId - The ID of the book being reviewed.
 * @param {INewReviewPayload} payload - The updated review data.
 * @returns {Promise<IReview>} - A promise that resolves to the updated review.
 * @throws {Error} - If the request fails, throws an error with the API error message.
 */
export const updateReview = async (bookId: number, payload: INewReviewPayload): Promise<IReview> => {
  const res = await authFetch(`${API_URL}/user/books/${bookId}/review`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error: IError = await res.json();
    throw new Error(error.message || "Erreur lors de la mise à jour de l'avis");
  }

  const data = await res.json();
  return data.review;
};

/**
 * Deletes a review for a book.
 *
 * @param {number} bookId - The ID of the book whose review should be deleted.
 * @returns {Promise<string>} - A promise that resolves to a success message.
 * @throws {Error} - If the request fails, throws an error with the API error message.
 */
export const deleteReview = async (bookId: number): Promise<string> => {
  const res = await authFetch(`${API_URL}/user/books/${bookId}/review`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error: IError = await res.json();
    throw new Error(error.message || "Erreur lors de la suppression de l'avis");
  }

  const data = await res.json();
  return data.message; // ex: "Avis supprimé avec succès"
};

/**
 * Retrieves all reviews for a specific book.
 *
 * @param {number} bookId - The ID of the book to get reviews for.
 * @returns {Promise<IReviewApiResponse>} - A promise that resolves to the reviews data.
 * @throws {Error} - If the request fails, throws an error with a generic message.
 */
export const getReviewsByBook = async (bookId: number): Promise<IReviewApiResponse> => {
  const res = await authFetch(`${API_URL}/books/${bookId}/reviews`);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des avis");
  }
  return res.json();
};
