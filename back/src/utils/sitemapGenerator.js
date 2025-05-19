import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { Book, Category } from "../models/associations.js";

async function generateSitemap(hostname) {

  // Statics url
  const staticUrls = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/categories", changefreq: "monthly", priority: 0.9 },
    { url: "/library", changefreq: "monthly", priority: 0.9 },
    { url: "/auth", changefreq: "yearly", priority: 0.7 },
    { url: "/search", changefreq: "yearly", priority: 0.8 },
    { url: "/about", changefreq: "yearly", priority: 0.7 },
    { url: "/mentions-legales", changefreq: "yearly", priority: 0.7 },
  ];

  // get dynamics'data
  const books = await Book.findAll({
    attributes: ["id"]
  });

  const booksUrls = books.map(book => ({
    url: `/books/${book.id}`,
    changefreq: "yearly",
    priority: 0.9,
  }));

  const categories = await Category.findAll({
    attributes: ["id"]
  });

  const categoriesUrls = categories.map(category => ({
    url: `/categories/${category.id}`,
    changefreq: "yearly",
    priority: 0.9
  }));

  // get all the urls in an array
  const urls = [...staticUrls, ...booksUrls, ...categoriesUrls];

  // create stream for sitemap
  const stream = new SitemapStream({ hostname });

  // generate XML
  const sitemap = await streamToPromise(Readable.from(urls).pipe(stream));

  return sitemap.toString();
}

export { generateSitemap };