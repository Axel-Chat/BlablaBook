interface IReviewAddProps {
  onWriteClick?: () => void;
}

/**
 * ReviewActions component that provides buttons for review-related actions.
 *
 * @param {Object} param - Component props.
 * @param {Function} param.onWriteClick - Callback function when the write review button is clicked.
 * @returns {JSX.Element} - The rendered review actions component.
 */
const OpenModal = ({ onWriteClick }: IReviewAddProps) => {

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center w-fit">
      <button
        className="rounded px-6 py-4 bg-gray-800 font-semibold text-lg text-white text-center shadow-sm transition-all duration-300 hover:bg-gray-600 hover:shadow-gray-400 cursor-pointer dark:bg-yellow-700 dark:hover:bg-yellow-500 dark:hover:shadow-yellow-400" aria-label="Ouvrir le formulaire pour écrire un avis"
        onClick={onWriteClick}
      >
        Laissez un avis
      </button>
    </div>
  );
};

export default OpenModal;