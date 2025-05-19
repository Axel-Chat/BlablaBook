import { Router } from "express";
import { userLibraryController } from "../controller/userLibraryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const router = Router();

/**
 * @openapi
 * /user/library:
 *   get:
 *     tags:
 *       - Bibliothèque utilisateur
 *     summary: Récupère les livres lus et à lire de l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bibliothèque de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLibrary'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFound'
 */
router.get("/user/library", authMiddleware, userLibraryController.getLibrary);

/**
 * @openapi
 * /user/books/read/{bookId}:
 *   post:
 *     tags:
 *       - Bibliothèque utilisateur
 *     summary: Ajouter un livre à la liste des livres lus
 *     description: Ajoute le livre correspondant à l'ID à la bibliothèque de livres déjà lus de l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à ajouter à la liste des livres lus
 *     responses:
 *       200:
 *         description: Livre ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddToReadListSuccess'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Utilisateur ou livre non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/UserNotFound'
 *                 - $ref: '#/components/schemas/BookNotFound'
 */
router.post("/user/books/read/:bookId", authMiddleware, userLibraryController.addToMyReadLibrary);

/**
 * @openapi
 * /user/books/read/{bookId}:
 *   delete:
 *     tags:
 *       - Bibliothèque utilisateur
 *     summary: Retirer un livre de la liste des livres lus
 *     description: Supprime un livre spécifique de la liste des livres déjà lus de l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à retirer
 *     responses:
 *       200:
 *         description: Livre retiré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RemoveFromReadListSuccess'
 *       400:
 *         description: Le livre n'est pas dans la bibliothèque lue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookNotInReadListError'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Utilisateur ou livre non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.delete("/user/books/read/:bookId", authMiddleware, userLibraryController.deleteToMyReadLibrary);

/**
 * @openapi
 * /user/books/to-read/{bookId}:
 *   post:
 *     summary: Ajouter un livre à la liste "à lire" de l'utilisateur
 *     description: Permet à l'utilisateur connecté d'ajouter un livre à sa liste des livres à lire.
 *     tags:
 *       - Bibliothèque utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à ajouter
 *     responses:
 *       200:
 *         description: Livre ajouté à la liste des livres à lire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddToWishReadResponse'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Livre ou utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/UserNotFound'
 *                 - $ref: '#/components/schemas/BookNotFound'
 */
router.post("/user/books/to-read/:bookId", authMiddleware, userLibraryController.addToWishRead);

/**
 * @openapi
 * /user/books/to-read/{bookId}:
 *   delete:
 *     summary: Retirer un livre de la liste "à lire" de l'utilisateur
 *     description: Supprime un livre de la liste des livres à lire pour l'utilisateur authentifié.
 *     tags:
 *       - Bibliothèque utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à retirer
 *     responses:
 *       200:
 *         description: Livre retiré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteFromWishReadSuccess'
 *       400:
 *         description: Le livre n'est pas dans la liste à lire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookNotInWishList'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Livre ou utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/UserNotFound'
 *                 - $ref: '#/components/schemas/BookNotFound'
 */
router.delete("/user/books/to-read/:bookId", authMiddleware, userLibraryController.deleteToWishRead);