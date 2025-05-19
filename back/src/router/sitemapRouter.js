import { generateSitemap } from "../utils/sitemapGenerator.js";
import { Router } from "express";
import { ApiError } from "../middlewares/ApiError.js";

export const router = Router();

// generate sitemap.xml
router.get("/sitemap.xml", async (req, res, next) => {
  const hostname = process.env.BASE_URL;
  const sitemap = await generateSitemap(hostname);

  res.header("Content-Type", "application/xml");

  if (!sitemap) {
    return next(new ApiError("le sitemap n'existe pas", 404));
  }

  res.send(sitemap);
});

router.get("/robots.txt", (req, res) => {
  const hostname = process.env.BASE_URL;

  // Contenu simple du robots.txt avec référence au sitemap
  const robotsTxt = `User-agent: *
Disallow: /auth/
Disallow: /user/settings/
Disallow: /logout/
Disallow: /profile/
Disallow: /books/read/
Disallow: /books/to-read/
Sitemap: ${hostname}/sitemap.xml
`;

  res.type("text/plain");
  res.send(robotsTxt);
});
