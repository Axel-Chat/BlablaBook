import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createReview, updateReview } from "../../api/apiReview";
import { INewReviewPayload } from "../../@types/review";
import { toastSuccess, toastWarning } from "../../utils/toast/toaster";
import { useAuthStore } from "../../utils/store/useAuthStore";

interface IReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number;
  onReviewAdded: () => void; // To reload reviews
  reviewToEdit?: {
    title?: string;
    comment?: string;
    rating?: number;
  } | null;
}

/**
 * ReviewModal component that displays a modal for submitting a new review.
 */
const ReviewModal = ({
  isOpen,
  onClose,
  bookId,
  onReviewAdded,
  reviewToEdit,
}: IReviewModalProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthStore();
  const userId = user?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: INewReviewPayload = {
        title: title || undefined,
        comment: comment || undefined,
        rating: rating ?? undefined,
      };

      if (!reviewToEdit) {
        await createReview(bookId, payload);
        toastSuccess("Votre avis a bien été ajouté !");
      } else {
        await updateReview(bookId, payload);
        toastSuccess("Votre avis a bien été modifié !");
      }

      onClose();
      onReviewAdded();
      setTitle("");
      setComment("");
      setRating(null);
    } catch (err) {
      if (!userId) {
        toastWarning(`Vous devez être connecté pour pouvoir laisser un avis.
      <div class="mt-4 text-center">
        <a href="/auth" class="text-blue-600 underline font-semibold hover:text-blue-800 transition">
          Se connecter
        </a>
      </div>`);
        onClose();
        return;
      }
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reviewToEdit) {
      setTitle(reviewToEdit.title || "");
      setComment(reviewToEdit.comment || "");
      setRating(reviewToEdit.rating ?? null);
    } else {
      setTitle("");
      setComment("");
      setRating(null);
    }
  }, [reviewToEdit, isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed font-body inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative shadow-lg dark:bg-body">
        <button
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-800 text-xl dark:hover:text-gray-200"
          aria-label="Fermer la fenêtre"
          onClick={onClose}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>

        <h2
          id="review-modal-title"
          className="text-2xl font-bold mb-4 text-black dark:text-placeholder"
        >
          Laissez votre avis
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 dark:text-placeholder">
          {/* Simplified rating selector */}
          <div className="flex gap-1 dark:text-placeholder" aria-label="Choisissez une note">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-2xl cursor-pointer ${
                  rating && rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                aria-label={`Donner ${star} étoile${star > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Titre"
            className="px-4 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Votre commentaire..."
            className="px-4 py-2 border rounded-lg h-32"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded cursor-pointer px-6 py-3 bg-gray-800 text-white font-semibold hover:bg-gray-600 dark:bg-yellow-700 dark:hover:bg-yellow-500 dark:hover:shadow-yellow-400"
          >
            {loading ? "Envoi en cours..." : "Postez votre avis"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ReviewModal;
