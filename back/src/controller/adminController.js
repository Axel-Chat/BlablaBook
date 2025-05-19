import { Book, Category, Author } from "../models/associations.js";
import { ApiError } from "../middlewares/ApiError.js";

const adminController = {
  /**
   *  Add a new book in DB
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {Object} Book
   */

  async addNewBook(req, res, next) {
    // Get the params
    const { isbn, title, description, published, cover_url, page_count } = req.body;

    //   check if the book is not already in the DB
    const isRegistered = await Book.findOne({ where: { isbn } });
    if (isRegistered) {
      return next(new ApiError("Impossible d'ajouter ce livre car il existe déjà", 409));
    }

    const newBook = await Book.create({
      isbn,
      title,
      description,
      published,
      cover_url,
      page_count,
    });

    res.status(201).json(newBook);
  },

  /**
   *  update a book in DB
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {Object} Book
   */

  async updateBook(req, res, next) {
    // First check if the url ID exist, if not error 404
    const bookId = parseInt(req.params.bookId);

    const book = await Book.findByPk(bookId);

    if (!book) {
      return next(new ApiError("Ce livre n'existe pas", 404));
    }

    // Get the params
    const fields = ["isbn", "title", "description", "published", "cover_url", "page_count"];

    // if a value is declare, change it otherwise don't
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        book[field] = req.body[field];
      }
    });

    // Save changes in the DB
    await book.save();

    // return updated book
    res.status(200).json(book);
  },

  /**
   *  delete a book in DB
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {void}- status 204
   */

  async deleteBook(req, res, next) {
    // First check if the url ID exist, if not error 404
    const bookId = parseInt(req.params.bookId);

    const book = await Book.findByPk(bookId);

    if (!book) {
      return next(new ApiError("Ce livre n'existe pas", 409));
    }

    // otherwise the book exist so we can delete it
    await book.destroy();
    res.sendStatus(204);
  },

  /**
   * @function createCategory
   * @description Create a new category and save it to the database.
   * @param {object} req -- Express request object (expects `name` in body).
   * @param {object} res -Express response object.
   * @param {function} next - Express next middleware function.
   * @return {object}- status 201
   */

  async addCategory(req, res, next) {
    const { name } = req.body;

    const isRegistered = await Category.findOne({ where: { name } });
    if (isRegistered) {
      return next(new ApiError("Impossible d'ajouter cette catégorie car elle existe déjà", 409));
    }

    const newCategory = await Category.create({ name });

    res.status(201).json(newCategory);
  },

  /**
   * @function updateCategory
   * @description Update the name of existing name
   * @param {object} req -Express request object (expects `categoryId` as param).
   * @param {object} res -Express response object
   * @param {function} next - Express next middleware function.
   * @return {object}- status 200
   */

  async updateCategory(req, res, next) {
    const id = parseInt(req.params.categoryId);

    const category = await Category.findByPk(id);
    if (!category) {
      return next(new ApiError("La mise à jour est impossible", 404));
    }

    const { name } = req.body;

    //
    if (name) {
      category.name = name;
    }

    await category.save();
    res.status(200).json(category);
  },

  /**
   * @function deleteCategory
   * @description Delete a name by id from the database
   * @param {object} req -Express request object
   * @param {object} res -Express response object, returns success message.
   * @param {function} next - Express next middleware function, used to handle errors.
   * @return {void}- status 204
   */

  async deleteCategory(req, res, next) {
    const id = parseInt(req.params.categoryId);

    const category = await Category.findByPk(id);

    if (!category) {
      return next(new ApiError("Impossible de supprimer", 404));
    }
    await category.destroy();
    res.sendStatus(204);
  },

  /**
   * @function addAuthor
   * @description Create a new author with the provided name.
   * @param {Object} req - Express request object (expects `name` in `req.body`).
   * @param {Object} res - Express response object.
   * @returns {Object} - author
   */
  async addAuthor(req, res, next) {
    const { name } = req.body;
    const allAuthors = await Author.findAll();

    // Check if an author with the same name (case-insensitive) already exists
    const authorExists = allAuthors.some((author) => author.name.toLowerCase() === name.toLowerCase());

    if (authorExists) {
      return next(new ApiError("Impossible d'ajouter cet auteur car il existe déjà", 409));
    }

    const newAuthor = await Author.create({ name });
    res.status(201).json(newAuthor);
  },

  /**
   * @function updateAuthor
   * @description Update the name of an existing author.
   * @param {Object} req - Express request object (expects `authorId` as param and `name` in body).
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Object} - author
   */
  async updateAuthor(req, res, next) {
    const id = parseInt(req.params.authorId);

    const author = await Author.findByPk(id);

    // check if author exist, if it doesn't, go to tne error middleware
    if (!author) {
      return next(new ApiError("Cet auteur n'existe pas", 404));
    }

    // get the value to change, here : name
    const { name } = req.body;

    author.name = name;

    await author.save();

    res.status(200).json(author);
  },

  /**
   * @function deleteAuthor
   * @description Delete an author by ID from the database.
   * @param {Object} req - Express request object, must contain `authorId` as route param.
   * @param {Object} res - Express response object, returns success message.
   * @param {Function} next - Express next middleware function, used to handle errors.
   * @returns {void}
   */
  async deleteAuthor(req, res, next) {
    const id = parseInt(req.params.authorId);
    const author = await Author.findByPk(id);

    if (!author) {
      return next(new ApiError("Cet auteur n'existe pas", 404));
    }

    await author.destroy();

    res.sendStatus(204);
  },
};

export { adminController };
