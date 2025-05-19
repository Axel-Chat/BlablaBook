import { User, Book } from "../models/associations.js";
import { ApiError } from "../middlewares/ApiError.js";

const userLibraryController = {
  /**
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @throws {Error} Utilisateur non trouvé (404)
   */
  async getLibrary(req, res, next) {
    const userId = req.user.userId;
    if (!userId) {
      return next(new ApiError("Non autorisé !", 401));
    }

    const result = await User.findByPk(userId, {
      include: ["books_already_read", "books_wish_read"],
    });

    if (!result) {
      return next(new ApiError("Utilisateur non trouvé", 404));
    }

    res.status(200).json(result);
  },

  /**
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @throws {Error} Utilisateur non trouvé (409)
   * @throws {Error} Livre non trouvé (409)
   */
  async addToMyReadLibrary(req, res, next) {
    const userId = req.user.userId;
    if (!userId) {
      return next(new ApiError("Non autorisé !", 401));
    }
    const bookId = parseInt(req.params.bookId);

    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ApiError("Utilisateur non trouvé", 404));
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return next(new ApiError("Livre non trouvé", 404));
    }

    await user.addBooks_already_read(book);

    res.status(200).json({ message: "Livre ajouté à la liste des livres lus" });
  },

  /**
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @throws {Error} Utilisateur ou livre non trouvé (409)
   */
  async deleteToMyReadLibrary(req, res, next) {
    const userId = req.user.userId;
    if (!userId) {
      return next(new ApiError("Non autorisé !", 401));
    }
    const bookId = parseInt(req.params.bookId);

    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);
    if (!user || !book) {
      return next(new ApiError("Utilisateur ou livre non trouvé", 404));
    }

    // Verification: Book present in the list
    const isInList = await user.hasBooks_already_read(book);
    if (!isInList) {
      return next(new ApiError("Ce livre n'est pas dans votre bibliothèque lue", 400));
    }

    await user.removeBooks_already_read(book);

    res.status(200).json({ message: "Livre retiré de la liste des livres lus" });
  },

  /**
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @throws {Error} Utilisateur non trouvé (409)
   * @throws {Error} Livre non trouvé (409)
   */
  async addToWishRead(req, res, next) {
    const userId = req.user.userId;
    if (!userId) {
      return next(new ApiError("Non autorisé !", 401));
    }
    const bookId = parseInt(req.params.bookId);

    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ApiError("Utilisateur non trouvé", 404));
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return next(new ApiError("Livre non trouvé", 404));
    }

    await user.addBooks_wish_read(book);

    res.status(200).json({ message: "Livre ajouté à la liste des livres à lire" });
  },

  /**
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @throws {Error} Utilisateur ou livre non trouvé (409)
   */
  async deleteToWishRead(req, res, next) {
    const userId = req.user.userId;
    if (!userId) {
      return next(new ApiError("Non autorisé !", 401));
    }
    const bookId = parseInt(req.params.bookId);

    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user || !book) {
      return next(new ApiError("Utilisateur ou livre non trouvé", 404));
    }

    // Verification: Book present in the list
    const isInList = await user.removeBooks_wish_read(book);
    if (!isInList) {
      return next(new ApiError("Ce livre n'est pas dans votre bibliothèque à lire", 400));
    }
    await user.removeBooks_wish_read(book);

    res.status(200).json({ message: "Livre retiré de la liste des livres à lire" });
  },
};

export { userLibraryController };
