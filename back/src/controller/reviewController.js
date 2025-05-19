import { Review } from "../models/associations.js";
import { ApiError } from "../middlewares/ApiError.js";

const reviewController = {
  /**
   * Controller method to create a new review or rating for a book.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the created review data.
   */
  async createReview(req, res, next) {
    const userId = req.user?.userId;
    const bookId = parseInt(req.params.bookId);
    const { rating, title, comment } = req.body;

    if (!rating && !title && !comment) {
      return next(new ApiError("Vous devez au moins noter ou laisser un commentaire", 400));
    }

    const existingReview = await Review.findOne({
      where: { user_id: userId, book_id: bookId },
    });
    if (existingReview) {
      return next(new ApiError("Vous avez déjà laissé un avis pour ce livre", 400));
    }

    const review = await Review.create({
      user_id: userId,
      book_id: bookId,
      rating,
      title,
      comment,
    });

    res.status(201).json({ message: "Avis créé avec succès", review });
  },

  /**
   * Controller method to update an existing review.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the updated review data.
   */
  async updateReview(req, res, next) {
    const userId = req.user?.userId;
    const bookId = parseInt(req.params.bookId);
    const { rating, title, comment } = req.body;

    const review = await Review.findOne({
      where: { user_id: userId, book_id: bookId },
    });

    if (!review) {
      return next(new ApiError("Aucun avis à mettre à jour pour ce livre", 404));
    }

    review.rating = rating ?? review.rating; // Nullish coalescing : Use rating if it is defined (not null and not undefined), otherwise keep the old value.
    review.title = title ?? review.title;
    review.comment = comment ?? review.comment;
    await review.save();

    res.status(200).json({ message: "Avis mis à jour avec succès", review });
  },

  /**
   * Controller method to delete a review.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with a success message.
   */
  async deleteReview(req, res, next) {
    const userId = req.user?.userId; // ID de l'utilisateur authentifié
    const bookId = parseInt(req.params.bookId); // ID du livre

    const review = await Review.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });
    if (!review) {
      return next(new ApiError("Aucun avis trouvé à supprimer", 404));
    }

    await review.destroy();
    res.status(200).json({ message: "Avis supprimé avec succès" });
  },

  /**
   * Controller method to retrieve reviews for a specific book.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the book reviews data.
   */
  async getReviewsByBook(req, res, next) {
    const bookId = parseInt(req.params.bookId);

    const reviews = await Review.findAll({
      where: { book_id: bookId },
      include: [{ association: "users", attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });

    // Sequelize always returns an array, so we check for empty array
    if (reviews.length === 0) {
      return next(new ApiError("Aucun avis trouvé pour ce livre", 404));
    }

    res.status(200).json({
      book_id: bookId,
      reviews: reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        book_id: review.book_id,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        user: review.users,
      })),
    });
  },
};

export { reviewController };
