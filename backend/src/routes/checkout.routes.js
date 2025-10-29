import express from "express";
import { CheckoutController } from "../controllers/checkout.controller.js";
import { authMiddleware } from "../utils/auth.middleware.js";

const router = express.Router();
const controller = new CheckoutController();

router.post("/", authMiddleware, controller.checkout);

export default router;
