import { Router } from "express";
import { validate } from "../middlewares/validateWrapper.js";
import { authController } from "../controller/authController.js";
import { registerSchema } from "../middlewares/schemaValidate/authValidateSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const router = Router();

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: Crée un nouvel utilisateur
 *     description: Valide les données, empêche les emails jetables, puis enregistre un nouvel utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Erreur de validation
 *       409:
 *         description: Email déjà utilisé
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: Connecte l'utilisateur
 *     description: Vérifie si l'email est présent en base données et compare le mot de passe avec celui en base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Requête invalide (email ou mot de passe)
 */
router.post("/login", authController.login);

/**
 * @openapi
 * /logout:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: Déconnecte l'utilisateur
 *     description: Supprime le token côté client (aucune action côté serveur dans ce cas précis).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       500:
 *         description: Erreur serveur
 */
router.post("/logout", authMiddleware, authController.logout);