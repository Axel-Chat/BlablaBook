interface IReviewCardProps {
  username: string;
  date: string;
  rating?: number;
  title?: string;
  comment?: string;
  isOwner?: boolean; // new attribute to know if it is the author
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReviewCard = ({
  username,
  date,
  rating,
  title,
  comment,
  isOwner,
  onEdit,
  onDelete,
}: IReviewCardProps) => {
  const fullStars = rating !== undefined ? Math.round(rating) : 0;

  return (
    <div className="w-full border-b border-gray-200 pb-6 last:border-none">
      {/* Stars + user */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        {rating !== undefined && rating > 0 ? (
          <div
            className="flex items-center gap-2"
            aria-label={`Note de ${rating} sur 5 étoiles`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill={i < fullStars ? "#FBBF24" : "#E5E7EB"}
              >
                <path d="M14.1 2.57c.37-.74 1.43-.74 1.8 0l3.28 6.64c.15.3.43.5.76.55l7.33 1.07c.82.12 1.15 1.13.52 1.7l-5.3 5.17a.94.94 0 00-.27.84l1.25 7.3c.14.82-.69 1.45-1.42 1.07l-6.56-3.45a.95.95 0 00-.9 0l-6.56 3.45c-.73.38-1.56-.25-1.42-1.07l1.25-7.3a.94.94 0 00-.27-.84L2.19 12.53c-.63-.58-.3-1.59.52-1.7l7.33-1.07c.33-.05.61-.25.76-.55L14.1 2.57z" />
              </svg>
            ))}
          </div>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <p className="font-semibold text-lg text-black dark:text-yellow-500">@{username}</p>
          <p className="text-gray-400 text-base dark:text-placeholder">{date}</p>
        </div>
      </div>

      {/* Notice displayed dynamically according to content */}
      {title && (
        <h4 className="text-lg font-semibold text-black mb-2 dark:text-yellow-500">{title}</h4>
      )}
      {comment && <p className="text-lg text-gray-600 leading-8 dark:text-placeholder">{comment}</p>}

      {isOwner && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded bg-blue-300 font-medium hover:bg-blue-200 transition dark:text-gray-800"
          >
            <i className="fa-solid fa-pencil"></i> Modifier
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded bg-red-300 font-medium hover:bg-red-200 transition dark:text-gray-800"
          >
            <i className="fa-solid fa-trash"></i> Supprimer
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
