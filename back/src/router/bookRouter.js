import { Router } from "express";
import { bookController } from "../controller/bookController.js";

export const router = Router();

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Retourne la liste des livres ou des catégories
 *     description: Peut filtrer les livres par nom, auteur, catégorie, ou renvoyer uniquement les catégories.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche dans le titre des livres ou le nom des auteurs
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrer les livres par ID de catégorie
 *       - in: query
 *         name: onlyCategories
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Si "true", retourne uniquement les catégories
 *     responses:
 *       200:
 *         description: Liste des livres ou des catégories
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/BooksResponse'
 *                 - $ref: '#/components/schemas/CategoriesResponse'
 *                 - $ref: '#/components/schemas/EmptyBooksResponse'
 *       500:
 *         description: Erreur serveur
 */
router.get("/books", bookController.getAllBooks);

/**
 * @openapi
 * /books/{bookId}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Récupère un livre par son ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à récupérer
 *     responses:
 *       200:
 *         description: Détail du livre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livre non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookNotFound'
 */
router.get("/books/:bookId", bookController.getOneBook);