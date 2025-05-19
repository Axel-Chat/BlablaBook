import Joi from "joi";

const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(5).messages({
    "number.base": `La note doit être un nombre`,
    "number.integer": `La note doit être un entier`,
    "number.min": `La note doit être au moins {#limit}`,
    "number.max": `La note doit être au plus {#limit}`,
  }),
  title: Joi.string().max(100).messages({
    "string.base": `Le titre doit être une chaîne de caractères`,
    "string.max": `Le titre ne doit pas dépasser {#limit} caractères`,
  }),
  comment: Joi.string().max(1000).messages({
    "string.base": `Le commentaire doit être une chaîne de caractères`,
    "string.max": `Le commentaire ne doit pas dépasser {#limit} caractères`,
  }),
});

export { reviewSchema };
