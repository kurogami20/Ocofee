import express from "express";
import mainController from "./controller/main_controller.js";
import products from "./controller/product_controller.js";
import error404 from "./middleware/error/404.js";
import session from "./middleware/admin_session.js";
import adminController from "./controller/admin_controller.js";
import multer from "multer";
import path from "path";

// * parametrage de multer
const storage = multer.diskStorage({
  destination:
    "/var/www/html/sigurd/projet MVC/S09-Ocoffee-kurogami20/public/assets/coffees",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  path,
});
const upload = multer({
  storage: storage,
});

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

router.use(error404);
export default router;
