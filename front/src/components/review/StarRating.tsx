interface IStarRatingStaticProps {
  rating: number; // ex : 4.3
  size?: number;  // optionnel : taille des étoiles
  showValue?: boolean; // optionnel : afficher "4.3" à côté
}

const StarRatingStatic = ({ rating, size = 20, showValue = false }: IStarRatingStaticProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        let fill = "#E5E7EB"; // gris clair par défaut

        if (i < fullStars) fill = "#FBBF24"; // plein
        else if (i === fullStars && hasHalfStar) fill = "url(#half-static)";

        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
          >
            {fill === "url(#half-static)" && (
              <defs>
                <linearGradient id="half-static">
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
            )}
            <path d="M17.1 2.7c.37-.74 1.43-.74 1.8 0l4.16 8.43c.15.3.43.51.76.56l9.3 1.35c.82.12 1.14 1.14.55 1.71l-6.73 6.56a.94.94 0 00-.27.84l1.6 9.27c.13.82-.7 1.45-1.43 1.07l-8.32-4.38a.95.95 0 00-.9 0l-8.32 4.38c-.73.38-1.56-.25-1.43-1.07l1.6-9.27a.94.94 0 00-.27-.84L2.33 14.75c-.59-.57-.27-1.59.55-1.71l9.3-1.35c.33-.05.61-.26.76-.56L17.1 2.7z" />
          </svg>
        );
      })}

      {showValue && (
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRatingStatic;
