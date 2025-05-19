import sequelize from "../models/client-sequelize.js";
import { User } from "../models/associations.js";
import { hash } from "../services/authService.js";

async function createAdmin() {
  await sequelize.authenticate();

  const password = await hash("MotDePasseUltraSecurisé123!");

  const admin = await User.create({
    name: "Admin",
    email: "admin@blabla.com",
    password,
    role: "admin",
  });

  console.log("✅ Admin créé :", admin.toJSON());
  process.exit();
}

createAdmin().catch((err) => {
  console.error("❌ Erreur lors de la création de l'admin :", err);
  process.exit(1);
});
