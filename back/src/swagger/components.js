// Security
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Register
/**
 * @openapi
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: Jean Dupont
 *           description: Doit contenir entre 3 et 50 caractères.
 *         email:
 *           type: string
 *           format: email
 *           example: jean.dupont@example.com
 *           description: Doit être une adresse email valide.
 *         password:
 *           type: string
 *           format: password
 *           minLength: 12
 *           maxLength: 100
 *           example: MotDePasse123!
 *           description: >
*             Doit contenir au moins :
*             - 12 caractères
*             - 1 lettre majuscule
*             - 1 lettre minuscule
*             - 1 chiffre
*             - 1 caractère spécial
*             - aucun espace
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: MotDePasse123!
 *           description: Doit être identique au champ "password"

 *     RegisterResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: Utilisateur créé avec succès.
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Jean Dupont
 *                 email:
 *                   type: string
 *                   example: jean.dupont@example.com
 */

// Login
/**
 * @openapi
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: jean.dupont@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: MotDePasse123!

 *     LoginResponse:
 *       type: object
 *       properties:
 *         id:
 *          type: integer
 *          example: 1
 *         name:
 *          type: string
 *          example: Jean Dupont
 *         token:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *         expiresIn:
 *          type: string
 *          example: 1h
 */

// Logout
/**
 * @openapi
 * components:
 *   schemas:
 *     Logout:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: jean.dupont@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: MotDePasse123!

 *     LogoutResponse:
 *       type: object
 *       properties:
 *         id:
 *          type: integer
 *          example: 1
 *         name:
 *          type: string
 *          example: Jean Dupont
 *         token:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *         expiresIn:
 *          type: string
 *          example: 1h
 */

// admin/add/books
/**
 * @openapi
 * components:
 *   schemas:
 *     addBook:
 *       type: object
 *       required:
 *         - isbn
 *         - title
 *         - description
 *         - published
 *         - cover_url
 *         - page_count
 *       properties:
 *         isbn:
 *           type: string
 *           example: 9781234567890
 *         title:
 *           type: string
 *           example: Le Meilleur Livre
 *         description:
 *           type: string
 *           example: Un roman captivant sur le courage et la résilience.
 *         published:
 *           type: string
 *           format: date
 *           example: 2024
 *         cover_url:
 *           type: string
 *           format: uri
 *           example: 1647372127i/60624994
 *         page_count:
 *           type: integer
 *           example: 350
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Impossible d'ajouter ce livre car il existe déjà
 */

// admin/update/books/:bookId
/**
 * @openapi
 * components:
 *   schemas:
 *     updateBook:
 *       type: object
 *       properties:
 *         isbn:
 *           type: string
 *           example: 9781234567890
 *         title:
 *           type: string
 *           example: Le Meilleur Livre
 *         description:
 *           type: string
 *           example: Nouvelle description du livre.
 *         published:
 *           type: string
 *           format: date
 *           example: 2025
 *         cover_url:
 *           type: string
 *           format: uri
 *           example: 1647372127i/60624994
 *         page_count:
 *           type: integer
 *           example: 420
 */

// /admin/add/categories
/**
 * @openapi
 * components:
 *   schemas:
 *     addCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Science-fiction
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Science-fiction
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Impossible d'ajouter cette catégorie car elle existe déjà
 */

// /admin/update/categories/:categoryId
/**
 * @openapi
 * components:
 *   schemas:
 *     updateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Fantastique
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Fantastique
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: La mise à jour est impossible
 */

// /admin/add/authors
/**
 * @openapi
 * components:
 *   schemas:
 *     addAuthor:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Victor Hugo
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Impossible d'ajouter cet auteur car il existe déjà
 */

// /admin/update/authors/:authorId
/**
 * @openapi
 * components:
 *   schemas:
 *     updateAuthor:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Victor Hugo
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Cet auteur n'existe pas
 */


// Books
/**
 * @openapi
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: J.K. Rowling
 *
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         name:
 *           type: string
 *           example: Fantastique
 *
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Harry Potter à l'école des sorciers
 *         authors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Author'
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *
 *     BooksResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Book'
 *
 *     CategoriesResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Category'
 *
 *     EmptyBooksResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Aucun livre trouvé.
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Book'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Alice Dupont
 *
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Harry Potter à l'école des sorciers
 *         authors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Author'
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         users_has_read:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         users_need_to_read:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *
 *     BookNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Ce livre n'existe pas
 */

// User
/**
 * @openapi
 * components:
 *   schemas:
 *     BookShort:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Harry Potter à l'école des sorciers

 *     UserWithBooks:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 42
 *         name:
 *           type: string
 *           example: Alice Martin
 *         email:
 *           type: string
 *           format: email
 *           example: alice@example.com
 *         books_already_read:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BookShort'
 *         books_wish_read:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BookShort'

 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Non autorisé !

 *     UserNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Utilisateur non trouvé
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: nouvel.email@example.com
 *         name:
 *           type: string
 *           example: Jean Nouvel
 *         password:
 *           type: string
 *           format: password
 *           example: NouveauMotDePasse123!
 *         confirmePassword:
 *           type: string
 *           format: password
 *           example: NouveauMotDePasse123!
 *         currentPassword:
 *           type: string
 *           format: password
 *           example: AncienMotDePasse123!
 *       required: []
 *       description: Un ou plusieurs champs à modifier (mot de passe nécessite le mot de passe actuel)
*
*     EmailConflict:
*       type: object
*       properties:
*         message:
*           type: string
*           example: E-mail déjà utilisé

*     InvalidDomain:
*       type: object
*       properties:
*         message:
*           type: string
*           example: Ce domaine n'est pas valide;

*     DisposableEmail:
*       type: object
*       properties:
*         message:
*           type: string
*           example: Les adresses e-mail temporaires ne sont pas acceptées

*     PasswordRequired:
*       type: object
*       properties:
*         message:
*           type: string
*           example: Le mot de passe actuel est requis pour le modifier

*     IncorrectPassword:
*       type: object
*       properties:
*         message:
*           type: string
*           example: Mot de passe actuel incorrect
*/

// User Library
