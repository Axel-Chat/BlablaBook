import { Router } from "express";
import { adminController } from "../controller/adminController.js";
import { validate } from "../middlewares/validateWrapper.js";
import { categorySchema } from "../middlewares/schemaValidate/categoryValidateSchema.js";
import { authorValidate } from "../middlewares/schemaValidate/authorValidateSchema.js";
import {
  createBookSchema,
  updateBookSchema,
} from "../middlewares/schemaValidate/bookValidateSchema.js";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const router = Router();

/**
 * @openapi
 * /admin/add/books:
 *   post:
 *     summary: Ajouter un nouveau livre
 *     description: Crée un nouveau livre dans la base de données s'il n'existe pas déjà (vérification via ISBN).
 *      security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addBook'
 *     responses:
 *       201:
 *         description: Livre créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addBook'
 *       409:
 *         description: Le livre existe déjà
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/admin/add/books",
  authMiddleware,
  isAdminMiddleware,
  validate(createBookSchema),
  adminController.addNewBook
);

/**
 * @openapi
 * /admin/update/books/:bookId:
 *   patch:
 *     summary: Met à jour les informations d’un livre existant
 *     description: Met à jour un livre par ID. Seules les propriétés spécifiées dans la requête seront modifiées.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateBook'
 *     responses:
 *       200:
 *         description: Livre mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addBook'
 *       404:
 *         description: Livre non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch(
  "/admin/update/books/:bookId",
  authMiddleware,
  isAdminMiddleware,
  validate(updateBookSchema),
  adminController.updateBook
);

/**
 * @openapi
 * /admin/delete/books/{bookId}:
 *   delete:
 *     summary: Supprime un livre
 *     description: Supprime un livre existant dans la base de données selon son ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à supprimer
 *     responses:
 *       204:
 *         description: Livre supprimé avec succès (aucun contenu retourné)
 *       404:
 *         description: Livre non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.delete(
  "/admin/delete/books/:bookId",
  authMiddleware,
  isAdminMiddleware,
  adminController.deleteBook
);

/**
 * @openapi
 * /admin/add/categories:
 *   post:
 *     summary: Ajouter une nouvelle catégorie
 *     description: Crée une catégorie si elle n'existe pas encore (vérification par nom).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addCategory'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       409:
 *         description: La catégorie existe déjà
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post(
  "/admin/add/categories",
  authMiddleware,
  isAdminMiddleware,
  validate(categorySchema),
  adminController.addCategory
);

/**
 * @openapi
 * /admin/update/categories/{categoryId}:
 *   patch:
 *     summary: Met à jour une catégorie existante
 *     description: Met à jour le nom d'une catégorie à partir de son ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateCategory'
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Catégorie non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.patch(
  "/admin/update/categories/:categoryId",
  authMiddleware,
  isAdminMiddleware,
  validate(categorySchema),
  adminController.updateCategory
);

/**
 * @openapi
 * /admin/delete/categories/{categoryId}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     description: Supprime une catégorie existante à partir de son ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie à supprimer
 *     responses:
 *       204:
 *         description: Catégorie supprimée avec succès (aucun contenu retourné)
 *       404:
 *         description: Catégorie non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.delete(
  "/admin/delete/categories/:categoryId",
  authMiddleware,
  isAdminMiddleware,
  adminController.deleteCategory
);

/**
 * @openapi
 * /admin/add/authors:
 *   post:
 *     summary: Ajouter un nouvel auteur
 *     description: Crée un nouvel auteur si le nom n'existe pas déjà (insensible à la casse).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addAuthor'
 *     responses:
 *       201:
 *         description: Auteur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addAuthor'
 *       409:
 *         description: L’auteur existe déjà
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/admin/add/authors",
  authMiddleware,
  isAdminMiddleware,
  validate(authorValidate),
  adminController.addAuthor
);

/**
 * @openapi
 * /admin/update/authors/{authorId}:
 *   patch:
 *     summary: Met à jour le nom d’un auteur existant
 *     description: Modifie le nom d’un auteur identifié par son ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l’auteur à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateAuthor'
 *     responses:
 *       200:
 *         description: Auteur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateAuthor'
 *       404:
 *         description: Auteur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch(
  "/admin/update/authors/:authorId",
  authMiddleware,
  isAdminMiddleware,
  validate(authorValidate),
  adminController.updateAuthor
);

/**
 * @openapi
 * /admin/delete/authors/{authorId}:
 *   delete:
 *     summary: Supprime un auteur par ID
 *     description: Supprime un auteur existant identifié par son ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l’auteur à supprimer
 *     responses:
 *       204:
 *         description: Auteur supprimé avec succès (pas de contenu retourné)
 *       404:
 *         description: Auteur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete(
  "/admin/delete/authors/:authorId",
  authMiddleware,
  isAdminMiddleware,
  adminController.deleteAuthor
);
