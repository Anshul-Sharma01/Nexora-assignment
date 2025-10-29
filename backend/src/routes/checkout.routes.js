import express from "express";
import { CheckoutController } from "../controllers/CheckoutController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const controller = new CheckoutController();

router.post("/", authMiddleware, controller.checkout);

export default router;
