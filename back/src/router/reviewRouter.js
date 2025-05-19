import { Router } from "express";
import { reviewController } from "../controller/reviewController.js";
import { validate } from "../middlewares/validateWrapper.js";
import { reviewSchema }  from "../middlewares/schemaValidate/reviewValidateSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const router = Router();

/**
 * @openapi
 * /user/books/{bookId}/review:
 *   post:
 *     tags:
 *       - Review
 *     summary: Ajouter une note ou un avis sur un livre
 *     description: Permet à un utilisateur connecté d'ajouter une note, un commentaire, ou les deux, sur un livre donné.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du livre à noter ou commenter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               title:
 *                 type: string
 *                 example: Une lecture passionnante
 *               comment:
 *                 type: string
 *                 example: J'ai adoré ce livre, surtout la fin qui m'a surpris !
 *     responses:
 *       201:
 *         description: Avis ou note ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewResponse'
 *       400:
 *         description: Aucun champ renseigné
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/user/books/:bookId/review", authMiddleware, validate(reviewSchema), reviewController.createReview);

/**
 * @openapi
 * /user/books/{bookId}/review:
 *   patch:
 *     tags:
 *       - Review
 *     summary: Modifier un avis existant sur un livre
 *     description: Permet à un utilisateur connecté de modifier son avis sur un livre.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               title:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avis mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewResponse'
 *       404:
 *         description: Aucun avis trouvé à mettre à jour
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/user/books/:bookId/review", authMiddleware, validate(reviewSchema), reviewController.updateReview);

/**
 * @openapi
 * /user/books/{bookId}/review:
 *   delete:
 *     tags:
 *       - Review
 *     summary: Supprimer son avis sur un livre
 *     description: Permet à un utilisateur connecté de supprimer son propre avis sur un livre.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avis supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avis supprimé avec succès
 *       404:
 *         description: Aucun avis trouvé à supprimer
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/user/books/:bookId/review", authMiddleware, reviewController.deleteReview);

/**
 * @openapi
 * /books/{bookId}/reviews:
 *   get:
 *     tags:
 *       - Review
 *     summary: Récupérer les avis et la note pour un livre
 *     description: Retourne la note (s'il y en a une) et les commentaires associés à un livre.
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID du livre
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Liste des avis pour le livre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookReviewsResponse'
 *       404:
 *         description: Aucun avis trouvés pour ce livre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/books/:bookId/reviews", reviewController.getReviewsByBook);