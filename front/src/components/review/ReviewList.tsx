import { useState } from "react";
import ReviewCard from "./ReviewCard";

interface IReview {
  id: string;
  username: string;
  date: string;
  rating: number;
  content: string;
}

interface IReviewListProps {
  reviews: IReview[];
  perPage?: number;
  showAll?: boolean;
}

const ReviewList = ({ reviews, perPage = 2 }: IReviewListProps) => {
  const [visibleCount, setVisibleCount] = useState(perPage);
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;


  return (
    <div className="mt-10 space-y-10">
      {visibleReviews.map((review) => (
        <ReviewCard
          key={review.id}
          username={review.username}
          date={review.date}
          rating={review.rating}
          review={review.content}
        />
      ))}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount((v) => v + perPage)}
            className="rounded px-6 py-4 bg-white font-semibold text-lg text-gray-700 text-center shadow-sm transition-all duration-300 hover:bg-gray-300 hover:shadow-gray-400 cursor-pointer"
          >
            Voir tout les avis
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
