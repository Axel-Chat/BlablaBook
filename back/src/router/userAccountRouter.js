import { Router } from "express";
import { validate } from "../middlewares/validateWrapper.js";
import { updateUserSchema } from "../middlewares/schemaValidate/userValidateSchema.js";
import { userController } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const router = Router();

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - Compte utilisateur
 *     summary: Récupère les infos de l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Données de l'utilisateur connecté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithBooks'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       409:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFound'
 */
router.get("/user", authMiddleware, userController.getOneUser);

/**
 * @openapi
 * /user:
 *   patch:
 *     tags:
 *       - Compte utilisateur
 *     summary: Modifier les infos de l'utilisateur connecté
 *     description: Permet de modifier l'email, le nom, ou le mot de passe (avec mot de passe actuel).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdatedUser'
 *       400:
 *         description: Requête invalide
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/PasswordRequired'
 *                 - $ref: '#/components/schemas/DisposableEmail'
 *                 - $ref: '#/components/schemas/InvalidDomain'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IncorrectPassword'
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFound'
 *       409:
 *         description: Conflit - Email déjà utilisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailConflict'
 */
router.patch("/user", authMiddleware, validate(updateUserSchema), userController.updateUser);

/**
 * @openapi
 * /user:
 *   delete:
 *     tags:
 *       - Compte utilisateur
 *     summary: Supprime le compte de l'utilisateur connecté
 *     description: Cette route permet à l'utilisateur actuellement connecté de supprimer son propre compte. Requiert un token d'authentification.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Compte supprimé avec succès. Aucune réponse.
 *       401:
 *         description: Non autorisé - L'utilisateur n'est pas authentifié
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
router.delete("/user", authMiddleware, userController.deleteUser);
