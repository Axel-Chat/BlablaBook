import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./src/router/router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { xss } from "express-xss-sanitizer";


// Run Application
const app = express();

app.use(express.json());
app.use(cors());

// Prevent XSS attacks
app.use(xss());

app.use(router);

//Middleware error
app.use(errorHandler);

const init = async () => {
    if (process.env.RUN_DB_SETUP === "true") {
      console.log("📦 Initializing database...");
      await import("./src/database/create_tables.js");
      await import("./src/database/seed_tables.js");
    }}

// Start
app.listen(process.env.PORT, () => {
  console.log(`Listening on API running ${process.env.BASE_URL}:${process.env.PORT}`);
});
