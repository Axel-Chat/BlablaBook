import { User } from "../models/associations.js";
import { hash } from "../services/authService.js"; // Utilise la fonction de hachage que tu as déjà
import sequelize from "../models/client-sequelize.js";

await sequelize.authenticate();
console.log("✅ Connexion à la base de données réussie");

const usersToCreate = [
  {
    name: "Test",
    email: "test@blabla.fr",
    password: "Motdepasse.1",
  },
  {
    name: "Charlie",
    email: "charlie@blabla.com",
    password: "Motdepasse.1",
  },
];

try {
  for (const userData of usersToCreate) {
    const existing = await User.findOne({ where: { email: userData.email } });

    if (!existing) {
      const hashedPassword = await hash(userData.password);

      await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      });

      console.log(`✅ Utilisateur "${userData.name}" créé`);
    } else {
      console.log(`⚠️ L'utilisateur "${userData.email}" existe déjà`);
    }
  }

  console.log("🎉 Création des utilisateurs terminée !");
} catch (err) {
  console.error("❌ Erreur lors de la création des utilisateurs :", err);
} finally {
  await sequelize.close();
}
