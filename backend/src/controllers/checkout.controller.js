import { CheckoutService } from "../services/checkout.service.js";

export class CheckoutController {
  constructor() {
    this.checkoutService = new CheckoutService();
  }

  checkout = async (req, res) => {
    try {
      const { userId } = req.user;
      const { cartItems } = req.body;

      const receipt = await this.checkoutService.checkout(userId, cartItems);
      res.json(receipt);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}
