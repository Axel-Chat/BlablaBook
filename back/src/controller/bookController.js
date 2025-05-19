import { Book, Category } from "../models/associations.js";
import { fn, col, Op, where } from "sequelize";
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
    const includeOptions = [{ association: "categories" }, { association: "authors" }, { association: "reviews" }];

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
        // Approche simplifiée pour éviter les problèmes de group by
        const books = await Book.findAll({
          include: [
            {
              association: "reviews",
              attributes: ["rating"],
              required: false, // Left join pour avoir tous les livres, même sans reviews
            },
            {
              association: "categories",
              required: false,
            },
            {
              association: "authors",
              required: false,
            },
          ],
          // Pas besoin de where condition car nous filtrerons après
        });

        // Calculer la moyenne des notes manuellement
        const booksWithRatings = books.map((book) => {
          const reviews = book.reviews || [];
          const ratings = reviews.map((review) => review.rating).filter((rating) => rating !== null);
          const averageRating =
            ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : null;

          // Renvoyer une version plainObject du livre avec la note moyenne
          return {
            ...book.get({ plain: true }),
            averageRating,
          };
        });

        // Trier par note moyenne (meilleure en premier) et ne prendre que les 5 premiers
        const topBooks = booksWithRatings
          .filter((book) => book.averageRating !== null)
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 5);

        return res.status(200).json(topBooks);
      } catch (error) {
        console.error("Error in topRated books:", error);
        return next(error);
      }
    }

    // get random books if asking in URL
    if (random === "true") {
      try {
        const randomBooks = await Book.findAll({
          order: [Sequelize.literal("RANDOM()")],
          limit: 5,
          include: includeOptions,
        });

        // Calculer manuellement les notes moyennes
        const randomBooksWithRatings = randomBooks.map((book) => {
          const reviews = book.reviews || [];
          const ratings = reviews.map((review) => review.rating).filter((rating) => rating !== null);
          const averageRating =
            ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : null;

          return {
            ...book.get({ plain: true }),
            averageRating,
          };
        });

        return res.status(200).json(randomBooksWithRatings);
      } catch (error) {
        console.error("Error in random books:", error);
        return next(error);
      }
    }

    // filter by author or name
    if (search) {
      whereConditions[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } }, // case insensitive on the book title
        { "$authors.name$": { [Op.iLike]: `%${search}%` } }, // case insensitive on the author name
      ];
      const year = Number(search);//for the year
      if (!isNaN(year)) {
        whereConditions[Op.or].push({ published: year });
      }
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

    try {
      const result = await Book.findAll({
        where: whereConditions,
        include: [
          ...includeOptions,
          {
            association: "categories",
            through: { attributes: [] },
          },
          {
            association: "authors",
            through: { attributes: [] },
          },
          {
            association: "reviews",
            attributes: [],
          },
        ],
        attributes: {
          include: [[fn("AVG", col("reviews.rating")), "averageRating"]],
        },
        group: ["Book.id", "categories.id", "authors.id"],
      });
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in standard book query:", error);
      return next(error);
    }
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
