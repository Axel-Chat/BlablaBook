import RatingBar from './RatingBar';
import { IReview } from "../../@types/review";
import { calculateRatingDistribution } from "../../utils/reviews";

interface IRatingsProps {
  reviews: IReview[];
}

/**
 * RatingDistribution component that displays a distribution of ratings.
 *
 * @param {Object} props - Component props.
 * @param {Review[]} props.reviews - Array of reviews to compute distribution from.
 * @returns {JSX.Element} - The rendered rating distribution component.
 */
const Ratings = ({ reviews }: IRatingsProps) => {
  const distribution = calculateRatingDistribution(reviews);

  return (
    <div className="flex flex-col gap-4">
      {distribution.map((rating) => (
        <RatingBar
          key={rating.stars}
          stars={rating.stars}
          percentage={rating.percentage}
          count={rating.count}
        />
      ))}
    </div>
  );
};

export default Ratings;