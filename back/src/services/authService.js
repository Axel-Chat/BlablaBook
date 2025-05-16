import "dotenv/config";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

/**
 * Hashes a plain text password using Argon2.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
export const hash = async (password) => {
  return await argon2.hash(password);
}

/**
 * Verifies a plain text password against a hashed password using Argon2.
 *
 * @param {string} plainTextPassword - The plain text password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
export const compare =  async (plainTextPassword, hashedPassword) => {
  return await argon2.verify(hashedPassword, plainTextPassword);
}

/**
 * Generates a JWT token with the given payload.
 *
 * @param {Object} payload - The payload to include in the JWT token.
 * @returns {string} - The generated JWT token.
 */
export const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

/**
 * Verifies a JWT token.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} - The decoded payload if the token is valid, null otherwise.
 */
export const verifyJwtToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Erreur JWT :", error.message);
    return null;
  }
}