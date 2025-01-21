import express from "express";
import mainController from "./controller/main_controller.js";
import products from "./controller/product_controller.js";
import error404 from "./middleware/error/404.js";
const router = express.Router();

// *home
router.get("/", mainController.displayHome);

// *browsing_page
router.get("/catalogue", mainController.displayBrowse);

// *product page
router.get("/produit/:id", products.displayProduct);

// *who page
router.get("/qui_sommes_nous", mainController.displayWho);

router.use(error404);
export default router;
