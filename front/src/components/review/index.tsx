import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AverageRating from "./AverageRating";
import Ratings from "./Ratings";
import ReviewModal from "./ReviewModal";
import OpenModal from "./OpenModal";
import ReviewList from "./ReviewList";
import { getReviewsByBook } from "../../api/apiReview";
import { calculateAverageRating } from "../../utils/reviews";
import { IReviewApiResponse } from "../../@types/review";
import { deleteReview } from "../../api/apiReview";
import { toastConfirm, toastSuccess, toastWarning } from "../../utils/toast/toaster";

/**
 * ReviewSection component that displays ratings, reviews, and review actions.
 */
const ReviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<IReviewApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewToEdit, setReviewToEdit] = useState<{
    title?: string;
    comment?: string;
    rating?: number;
  } | null>(null);

  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  // Fetch review data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getReviewsByBook(numericBookId);
      setReviewData(data);
    } catch (err) {
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch on mount and when book changes
  useEffect(() => {
    fetchData();
  }, [bookId]);

  /**
   * 
   */
  const handleDeleteReview = () => {
    toastConfirm("Voulez-vous vraiment supprimer votre avis ?", async () => {
      try {
        await deleteReview(numericBookId);
        toastSuccess("Votre avis a bien été supprimé.");
        fetchData();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toastWarning(
            err.message || "Une erreur est survenue lors de la suppression."
          );
        } else {
          toastWarning("Impossible de supprimer l'avis.");
        }
      }
    });
  };

  return (
    <section className="py-24 relative font-body">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-title text-4xl text-center mb-12 text-black dark:text-blue-100">
          Les notes et avis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {loading && !reviewData ? (
              <p className="text-gray-400">Chargement de la répartition...</p>
            ) : (
              <Ratings reviews={reviewData?.reviews ?? []} />
            )}
          </div>

          <div className="flex items-center justify-center">
            {loading && !reviewData ? (
              <p className="text-gray-400">Chargement de la moyenne...</p>
            ) : (
              <AverageRating
                value={calculateAverageRating(reviewData?.reviews ?? [])}
                subtitle={`${reviewData?.reviews.length ?? 0} avis`}
              />
            )}
          </div>

          <div className="flex items-center justify-center">
            <OpenModal onWriteClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        <div className="mt-12">
          {loading && !reviewData ? (
            <p className="text-center text-gray-600" aria-live="polite">
              Chargement des avis...
            </p>
          ) : reviewData?.reviews.length ? (
            <ReviewList
              reviews={reviewData.reviews.map((r) => ({
                id: String(r.id),
                username: r.user.name,
                userId: r.user.id,
                date: new Date(r.createdAt).toLocaleDateString("fr-FR"),
                rating: r.rating ?? undefined,
                title: r.title ?? undefined,
                comment: r.comment ?? undefined,
              }))}
              perPage={2}
              onDelete={handleDeleteReview}
              onEdit={(review) => {
                setReviewToEdit({
                  title: review.title,
                  comment: review.comment,
                  rating: review.rating,
                });
                setIsModalOpen(true);
              }}
            />
          ) : (
            <p className="text-center text-gray-500 mt-10 dark:text-placeholder" aria-live="polite">
              Aucun avis n’a encore été posté pour ce livre. Soyez le premier à
              laisser le vôtre !
            </p>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setReviewToEdit(null); // ✅ réinitialise le mode
        }}
        bookId={numericBookId}
        onReviewAdded={fetchData}
        reviewToEdit={reviewToEdit}
      />
    </section>
  );
};

export default ReviewSection;
