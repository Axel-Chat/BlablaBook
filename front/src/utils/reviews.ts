import { IReview } from "../@types/review";

/**
 * Compute rating distribution (1 to 5 stars) from a list of reviews.
 *
 * @param reviews - Array of reviews
 * @returns Array with star count, percentage, and total count per rating
 */
export const calculateRatingDistribution = (reviews: IReview[]) => {
  const ratingCounts = [0, 0, 0, 0, 0];
  const ratingsOnly = reviews.filter(
    (r): r is IReview & { rating: number } => r.rating !== null
  );

  for (const review of ratingsOnly) {
    const rating = review.rating;
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++;
    }
  }

  const total = ratingsOnly.length;

  return ratingCounts
    .map((count, index) => ({
      stars: index + 1,
      count,
      percentage: total === 0 ? 0 : Math.round((count / total) * 100),
    }))
    .reverse();
};

/**
 * Compute the average rating from a list of reviews.
 *
 * @param reviews - Array of reviews
 * @returns Average rating as a number (0-5)
 */
export const calculateAverageRating = (reviews: IReview[]): number => {
  const ratings = reviews
    .filter((r) => r.rating !== null)
    .map((r) => r.rating!); // Non-null assertion

  if (ratings.length === 0) return 0;

  const total = ratings.reduce((sum, current) => sum + current, 0);
  return total / ratings.length;
};
