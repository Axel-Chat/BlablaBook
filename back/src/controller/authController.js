import { hash, compare, generateJwtToken } from "../services/authService.js";
import { isDisposableEmail, isDomainValid } from "../services/emailService.js";
import { User } from "../models/associations.js";
import { ApiError } from "../middlewares/ApiError.js";

const authController = {
  /**
   * Controller method to register a new user.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the registration status and user data.
   */
  async register(req, res, next) {
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const password = req.body.password;

    // 1. Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ApiError("E-mail déjà utilisé", 409));
    }

    // 2. Check if the email is a disposable email
    if (isDisposableEmail(email)) {
      return next(new ApiError("Les adresses e-mail temporaires ne sont pas acceptées", 400));
    }

    // 3. Validate the email domain
    const domainIsValid = await isDomainValid(email);
    if (!domainIsValid) {
      return next(new ApiError("Ce domain n'est pas valide.", 400));
    }

    // 4. Create a new user with hashed password
    const newUser = await User.create({
      name,
      email,
      password: await hash(password),
      role: "user",
    });

    // 5. Send a success response with the new user's data
    res.status(201).json({
      status: "success",
      message: "Utilisateur créé avec succès.",
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  },

  /**
   * Controller method to handle user login.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the JWT token and expiration time.
   */
  async login(req, res, next) {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new ApiError("Identifiant invalide", 401));
    }

    // 2. Verify the provided password against the stored hashed password
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return next(new ApiError("Identifiant invalide", 401));
    }

    // 3. Generate a JWT token with the user's ID as the payload
    const token = generateJwtToken({ userId: user.id });
    // console.log("👤 Utilisateur trouvé :", user.toJSON());

    // 4. Send the JWT token and its expiration time in the response
    res.json({ name: user.name, id: user.id, token, expiresIn: "1h" });
  },

  /**
   * Controller method to handle user logout.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async logout(_req, res) {
    try {
      // Send a response indicating successful logout
      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
      next(error);
    }
  },
};

export { authController };
