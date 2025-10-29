import express from "express";
import { ProductController } from "../controllers/ProductController.js";

const router = express.Router();
const controller = new ProductController();

router.get("/", controller.getAllProducts);

export default router;
