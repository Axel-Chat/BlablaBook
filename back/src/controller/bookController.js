import { Book, Category } from "../models/associations.js";
import { Op, where } from "sequelize";
import Sequelize from "sequelize";
import { ApiError } from "../middlewares/ApiError.js";

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
    const { search, categoryId, categoryName, onlyCategories, topRated, random } = req.query; // get query

    const whereConditions = {};

    const includeOptions = [{ association: "categories" }, { association: "authors" }];

    // get all categories if asking in URL
    if (onlyCategories === "true") {
      try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
      } catch (error) {
        return next(error);
      }
    }

    // get top rated books if asking in URL
    if (topRated === "true") {
      try {
        const topBooks = await Book.findAll({
          // order by rating with best rating first
          order: [["rating", "DESC"]],
          // only 5 first books
          limit: 5,
          // do not include book with no rating
          where: {
            rating: {
              [Op.not]: null, // Exclut les livres sans note
            },
          },
        });
        return res.status(200).json(topBooks);
      } catch (error) {
        return next(error);
      }
    }

    // get random books if asking in URL
    if (random === "true") {
      try {
        const randomBooks = await Book.findAll({
          order: [Sequelize.literal("RANDOM()")],
          limit: 5,
        });
        return res.status(200).json(randomBooks);
      } catch (error) {
        return next(error);
      }
    }

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
      return res.status(200).json({
        message: "Aucun livre trouvé.",
        data: [],
      });
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
      include: [
        { association: "categories" },
        { association: "authors" },
        { association: "users_has_read" },
        { association: "users_need_to_read" },
      ],
    });

    // checking if result exist, if it's not, go to the middleware errorHandler
    if (!result) {
      return next(new ApiError("Ce livre n'existe pas", 404));
    }

    res.status(200).json(result);
  },
};

export { bookController };
