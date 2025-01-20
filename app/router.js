import express from "express";
import mainController from "./controller/main_controller.js";

const router = express.Router();

// *home
router.get("/", mainController.displayHome);

// *browsing_page
router.get("/catalogue", mainController.displayBrowse);

export default router;
