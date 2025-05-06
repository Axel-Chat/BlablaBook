/**
 * Middleware function to validate request body against a schema.
 *
 * @param {Object} schema - The validation schema.
 * @returns {Function} - The middleware function.
 */
export function validate(schema) {
  // Return the middleware function
  return (req, res, next) => {
    // Validate the request body against the schema
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    // Check if there is a validation error
    if (error) {
      // Extract error messages from the validation error details
      const errorMessages = error.details.map((detail) => detail.message);
      
      // Create a new error object
      const validationError = new Error("Erreur de validation");
      validationError.statusCode = 400; // Set the status code to 400 (Bad Request)
      validationError.details = errorMessages; // Attach the error messages to the error object
      
      // Pass the validation error to the next middleware
      return next(validationError);
    }
    
    // If there is no validation error, proceed to the next middleware
    next();
  };
}