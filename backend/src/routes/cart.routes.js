import express from "express";
import { CartController } from "../controllers/CartController.js";
import { authMiddleware } from "../utils/auth.middleware.js";


const router = express.Router();
const controller = new CartController();


router.use(authMiddleware);

router.get("/", controller.getCart);
router.post("/", controller.addToCart);
router.delete("/:id", controller.removeFromCart);

export default router;
