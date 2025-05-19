import { DataTypes, Model } from "sequelize";
import sequelize from "./client-sequelize.js";

export class Review extends Model {}

Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "review",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "book_id"], // Ensure one review per user per book
      },
    ],
  }
);
