import express from "express";
import mainController from "./controller/main_controller.js";
import products from "./controller/product_controller.js";
import error404 from "./middleware/error/404.js";
import session from "./middleware/admin_session.js";
import adminController from "./controller/admin_controller.js";
import upload from "./middleware/uloadMulter.js";
import footer from "./controller/footerController.js";

// *les routes
const router = express.Router();

router.use(session);

// *home
router.get("/", mainController.displayHome);

// *browsing_page
router.get("/catalogue", mainController.displayBrowse);

// *product page
router.get("/produit/:id", products.displayProduct);

// *who page
router.get("/qui_sommes_nous", mainController.displayWho);

// *admin
router.get("/admin", adminController.displayAdmin);
router.post("/admin", adminController.handleAdmin);
router.get("/log_out", adminController.logout);

// *add coffee
router.get("/admin/addCoffee", adminController.displayAddCoffee);
router.post(
  "/admin/addCoffee",
  upload.single("coffee_img"),
  adminController.AddCoffee
);
// *delete coffee
router.get("/admin/suppCoffee", adminController.displaySuppCoffee);
router.get("/suppCoffee/:ref", adminController.suppCoffee);

// *modif coffee
router.get("/admin/updCoffee", adminController.displayUpdCoffee);
router.post(
  "/admin/updCoffee",
  upload.single("coffee_img"),
  adminController.UpdCoffee
);

// *contact
router.get("/contact", footer.displaysContact);

router.use(error404);
export default router;
