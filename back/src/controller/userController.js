import { User } from "../models/associations.js";
import { ApiError } from "../middlewares/ApiError.js";
import { compare, hash } from "../services/authService.js";
import { isDisposableEmail, isDomainValid } from "../services/emailService.js";

const userController = {
  // Get one user with associated tables (already read books, wish-to-read books)
  /**
   * GET /user
   * @summary Fetch a user's information along with their associated books (already read and wish-to-read).
   * @param {number} userId.path.required - The ID of the user.
   * @return {object} 200 - Success response with user data and associated books.
   * @throws {Error} 409 - Utilisateur non trouvé.
   */

  // get one user from the database
  async getOneUser(req, res, next) {
    try {
      // get user id from request (set by auth middleware)
      const id = req.user?.userId;
      // if no id, user is not authorized
      if (!id) {
        return next(new ApiError("Non autorisé !", 401));
      }

      // find user by id with selected attributes and related books
      const user = await User.findByPk(id, {
        attributes: ["id", "name", "email"],
        include: ["books_already_read", "books_wish_read"],
      });

      // if user not found, send error to error handler
      if (!user) {
        return next(new ApiError("Utilisateur non trouvé", 409));
      }

      // send user data in response with status 200
      res.status(200).json(user);
    } catch (error) {
      // pass error to global error handler
      next(error);
    }
  },

  // Update a user's information (name, email, password)
  /**
   * PATCH /user
   * @summary Update a user's information such as name, email, and password.
   * @param {number} userId.path.required - The ID of the user to update.
   * @param {object} body.body.required - The fields to update (email, name, password).
   * @return {object} 200 - Success response with updated user data.
   * @throws {Error} 409 - Utilisateur non trouvé.
   */
  // update user info
  async updateUser(req, res, next) {
    try {
      // get user id from request (set by auth middleware)
      const id = req.user?.userId;
      // if no id, user is not authorized
      if (!id) {
        return next(new ApiError("Non autorisé !", 401));
      }

      // find user by id
      const user = await User.findByPk(id);
      // if user not found, send error
      if (!user) {
        return next(new ApiError("Utilisateur non trouvé", 404));
      }

      // get updated values from request body
      const { email, name, password, currentPassword } = req.body;

      // check and update email
      if (email) {
        const existingUser = await User.findOne({ where: { email } });

        // if email already used by another user
        if (existingUser && existingUser.id !== id) {
          return next(new ApiError("E-mail déjà utilisé", 409));
        }

        // check if email is disposable
        if (isDisposableEmail(email)) {
          return next(
            new ApiError(
              "Les adresses e-mail temporaires ne sont pas acceptées",
              400
            )
          );
        }

        // check if domain is valid
        const domainIsValid = await isDomainValid(email);
        if (!domainIsValid) {
          return next(new ApiError("Ce domaine n'est pas valide;", 400));
        }

        // set new email
        user.email = email;
      }

      // check and update name
      if (name) {
        user.name = name;
      }

      // check and update password
      if (password) {
        // current password is required to change it
        if (!currentPassword) {
          return next(
            new ApiError(
              "Le mot de passe actuel est requis pour le modifier",
              400
            )
          );
        }

        // compare current password
        const passwordValid = await compare(currentPassword, user.password);
        if (!passwordValid) {
          return next(new ApiError("Mot de passe actuel incorrect", 401));
        }

        // hash and set new password
        user.password = await hash(password);
      }

      // Save the updated user in database
      await user.save();

      // return updated user in response
      res.status(200).json(user);
    } catch (error) {
      // pass error to global error handler
      next(error);
    }
  },

  // Delete a user
  /**
   * DELETE /user
   * @summary Delete a specific user.
   * @param {number} userId.path.required - The ID of the user to delete.
   * @return {object} 200 - Success message indicating the user was deleted.
   * @throws {Error} 409 - Utilisateur non trouvé.
   */
  async deleteUser(req, res, next) {
    // get user id from token
    const id = req.user?.userId;
    if (!id) {
      return next(new ApiError("Non autorisé !", 401));
    }

    // find user by id
    const user = await User.findByPk(id);

    if (!user) {
      return next(new ApiError("Utilisateur non trouvé", 404));
    }

    // delete user from database
    await user.destroy();

    // send no content status
    res.sendStatus(204);
  },
};

export { userController };
