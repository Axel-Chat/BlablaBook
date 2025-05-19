interface IRatingBarProps {
  stars: number;           // The number of stars (1 to 5)
  percentage: number;      // Fill percentage (0 to 100)
  count: number;           // Number of reviews for this rating
};

/**
 * RatingBar component that displays a rating distribution bar.
 *
 * @param {Object} param - Component props.
 * @param {number} param.stars - The number of stars for this rating.
 * @param {number} param.percentage - The percentage of reviews with this rating.
 * @param {number} param.count - The count of reviews with this rating.
 * @returns {JSX.Element} - The rendered rating bar component.
 */
const RatingBar = ({ stars, percentage, count }: IRatingBarProps) => {
  return (
    <div className="flex items-center w-full" aria-label={`${stars} étoiles : ${count} avis, ${percentage}%`}>
      {/* Number of stars */}
      <p className="font-medium text-lg py-[1px] text-black mr-[2px] dark:text-placeholder">{stars}</p>

      {/* Star icon (we put one for the example) */}
      <svg className="mx-1" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M9.1 2.3C9.47 1.57 10.53 1.57 10.9 2.3L12.7 5.98C12.85 6.28 13.13 6.48 13.46 6.53L17.5 7.12C18.33 7.24 18.65 8.24 18.06 8.82L15.13 11.68C14.9 11.91 14.79 12.24 14.84 12.56L15.53 16.59C15.68 17.41 14.82 18.03 14.08 17.65L10.46 15.74C10.17 15.59 9.83 15.59 9.53 15.74L5.91 17.65C5.18 18.03 4.32 17.41 4.46 16.59L5.15 12.56C5.21 12.24 5.1 11.91 4.87 11.68L1.94 8.82C1.35 8.24 1.67 7.24 2.49 7.12L6.54 6.53C6.87 6.48 7.15 6.28 7.29 5.98L9.1 2.3Z"
          fill="#FBBF24"
        />
      </svg>

      {/* Progress bar */}
      <div className="h-2 w-full min-w-[150px] rounded-full bg-gray-200 mx-4">
        <div
          className="h-full bg-placeholder rounded-full dark:bg-yellow-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Number of reviews */}
      <p className="font-medium text-lg py-[1px] text-black dark:text-placeholder">{count}</p>
    </div>
  );
};

export default RatingBar;