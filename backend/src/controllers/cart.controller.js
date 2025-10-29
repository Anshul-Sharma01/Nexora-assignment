import { CartService } from "../services/cart.service.js";

export class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  getCart = async (req, res) => {
    try {
      const { userId } = req.user; 
      const result = await this.cartService.getCart(userId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  addToCart = async (req, res) => {
    try {
      const { userId } = req.user;
      const { productId, qty } = req.body;
      const item = await this.cartService.addToCart(userId, productId, qty);
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  removeFromCart = async (req, res) => {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      await this.cartService.removeFromCart(userId, id);
      res.json({ message: "Item removed" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}
