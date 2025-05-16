import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./src/router/router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { xss } from "express-xss-sanitizer";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./src/swagger/swaggerOptions.js";

// Run Application
const app = express();

app.use(express.json());
app.use(cors());

// Prevent XSS attacks
app.use(xss());

// Génération de la spec
const specs = swaggerJsdoc(swaggerOptions);

// Middleware pour Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//route for the robot who keep back server live
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use(router);

//Middleware error
app.use(errorHandler);

// Start
app.listen(process.env.PORT, () => {
  console.log(
    `Listening on API running ${process.env.BASE_URL}:${process.env.PORT}`
  );
});
