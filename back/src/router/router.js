import { Router } from "express";
import { router as bookRouter } from "./bookRouter.js";
import { router as userLibraryRouter } from "./userLibraryRouter.js";
import { router as userAccountRouter } from "./userAccountRouter.js";
import { router as adminRouter } from "./adminRouter.js";
import { router as authRouter } from "./authRouter.js";
import { router as sitemapRouter } from "./sitemapRouter.js";
import { router as reviewRouter } from "./reviewRouter.js";

// Main API router
const router = Router();

// sub router here
router.use(sitemapRouter);
router.use(bookRouter);
router.use(userLibraryRouter);
router.use(userAccountRouter);
router.use(adminRouter);
router.use(authRouter);
router.use(reviewRouter)

export { router };
