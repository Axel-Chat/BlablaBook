import { Book } from "../models/Book.js";
import { Op } from "sequelize";

const bookController = {
  /**
   * @function getAllBooks
   * @description Fetch all books from the database.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Array} - Object
   */
  async getAllBooks(req, res, next) {
    const { search, categoryId, categoryName } = req.query; // get query

    const whereConditions = {};

    const includeOptions = [{ association: "categories" }, { association: "authors" }];

    // filter by author or name
    if (search) {
      whereConditions[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } }, // case insensitive on the book title
        { "$authors.name$": { [Op.iLike]: `%${search}%` } }, // case insensitive on the author name
      ];
    }

    // If param is given, filter by category ID
    if (categoryId) {
      // initialise association to prevent error
      includeOptions[0].where = includeOptions[0].where || {};
      // define categoryId as a filter
      includeOptions[0].where.id = parseInt(categoryId);
    }
    // If param is given, filter by category name
    if (categoryName) {
      // initialise association to prevent error
      includeOptions[0].where = includeOptions[0].where || {};
      // define categoryName as a filter
      includeOptions[0].where.name = { [Op.iLike]: `%${categoryName}%` }; // case insensitive on the category name
    }

    const result = await Book.findAll({
      where: whereConditions,
      include: includeOptions,
    });

    if (result.length === 0) {
      const error = new Error("Il n'y a pas livres dans la base de données");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(result);
  },

  /**
   * @function getOneBook
   * @description Fetch a single book by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Object}
   */
  async getOneBook(req, res, next) {
    const id = parseInt(req.params.bookId);

    const result = await Book.findByPk(id, {
      include: [{ association: "categories" }, { association: "authors" }],
    });

    // checking if result exist, if it's not, go to the middleware errorHandler
    if (!result) {
      const error = new Error("Ce livre n'existe pas");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(result);
  },
};

export { bookController };
