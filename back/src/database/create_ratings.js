import { Book, User, Review } from "../models/associations.js";
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // nécessaire avec Render
    },
  },
});

// puis tu continues avec tes modèles et tes insertions

const addSelectedReviews = async () => {
  try {
    const selectedBookIds = [1, 2, 5, 9, 14];
    const user = await User.findOne();

    if (!user) {
      return next(new ApiError("Identifiant invalide", 401));
    }

    for (const bookId of selectedBookIds) {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return next(new ApiError("Livre non trouvé", 401));
      }

      const existing = await Review.findOne({
        where: { book_id: book.id, user_id: user.id },
      });
      if (existing) {
        console.log(`Review déjà existante pour le livre ID ${bookId}, on saute.`);
        continue;
      }

      await Review.create({
        book_id: book.id,
        user_id: user.id,
        rating: Math.floor(Math.random() * 5) + 1,
      });

      console.log(`Review ajoutée au livre ${bookId}`);
    }

    console.log("Tous les livres sélectionnées ont reçu une note !");
  } catch (error) {
    console.error("Erreur lors de l'ajout des reviews :", error);
  }
};

addSelectedReviews();