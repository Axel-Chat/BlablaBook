import { ApiError } from "../middlewares/ApiError.js";
import { Book, User, Review } from "../models/associations.js";

const addSelectedReviews = async (req, res, next) => {
  try {
    // Ids des livres favoris qui doivent avoir une note de 5
    const favoriteBooks = [15, 20, 49, 51, 57, 58];

    // Récupérer tous les livres
    const selectedBooks = await Book.findAll();

    // Récupérer l'utilisateur (prend le premier)
    const user = await User.findOne();

    if (!user) {
      return next(new ApiError("Identifiant invalide", 401));
    }

    console.log(`Traitement de ${selectedBooks.length} livres pour l'utilisateur ID ${user.id}`);
    console.log(`Livres favoris qui recevront une note de 5 : ${favoriteBooks.join(", ")}`);

    // Parcourir tous les livres
    for (const book of selectedBooks) {
      // Vérifier si une review existe déjà
      const existingReview = await Review.findOne({
        where: {
          book_id: book.id,
          user_id: user.id,
        },
      });

      // Déterminer la note : 5.0 pour les favoris, aléatoire pour les autres
      const isFavorite = favoriteBooks.includes(book.id);
      const rating = isFavorite ? 5.0 : Math.round((Math.random() * 4 + 1) * 10) / 10;

      if (existingReview) {
        // Mettre à jour la review existante
        await existingReview.update({ rating });
        console.log(`Review mise à jour pour le livre ID ${book.id} avec la note ${rating}${isFavorite ? " (favori)" : ""}`);
      } else {
        // Créer une nouvelle review avec la bonne note
        await Review.create({
          book_id: book.id,
          user_id: user.id,
          rating: rating, // Utiliser la note déterminée précédemment, pas une nouvelle note aléatoire
        });

        console.log(`Review ajoutée au livre ID ${book.id} avec la note ${rating}${isFavorite ? " (favori)" : ""}`);
      }
    }

    console.log("Tous les livres ont reçu une note !");
  } catch (error) {
    console.error("Erreur lors de l'ajout des reviews :", error);
  }
};

// Exécuter la fonction
addSelectedReviews();
