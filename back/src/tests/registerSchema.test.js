import { registerSchema } from "../middlewares/schemaValidate/authValidateSchema.js";

describe("Validation du formulaire d'inscription", () => {
  it("valide un utilisateur avec des données correctes", () => {
    const validUser = {
      name: "Alice",
      email: "alice@example.com",
      password: "Azerty123!@#",
      confirmPassword: "Azerty123!@#",
    };

    const { error } = registerSchema.validate(validUser);
    expect(error).toBeUndefined();
  });

  it("rejette si le mot de passe est trop court", () => {
    const invalidUser = {
      name: "Bob",
      email: "bob@example.com",
      password: "Short1!",
      confirmPassword: "Short1!",
    };

    const { error } = registerSchema.validate(invalidUser);
    expect(error?.details[0].message).toMatch(/au moins 12 caractères/i);
  });

  it("rejette si l'email est invalide", () => {
    const invalidUser = {
      name: "Charlie",
      email: "notanemail",
      password: "ValidPassword123!",
      confirmPassword: "ValidPassword123!",
    };

    const { error } = registerSchema.validate(invalidUser);
    expect(error?.details[0].message).toMatch(/email/i);
  });

  it("rejette si les mots de passe ne correspondent pas", () => {
    const invalidUser = {
      name: "David",
      email: "david@example.com",
      password: "ValidPassword123!",
      confirmPassword: "MismatchPassword456!",
    };

    const { error } = registerSchema.validate(invalidUser);
    expect(error?.details[0].message).toMatch(/mots de passe ne correspondent pas/i);
  });

  it("rejette si le mot de passe ne contient pas de majuscule", () => {
    const invalidUser = {
      name: "Eva",
      email: "eva@example.com",
      password: "password123!@#",
      confirmPassword: "password123!@#",
    };

    const { error } = registerSchema.validate(invalidUser);
    expect(error?.details[0].message).toMatch(/majuscule/i);
  });
});
