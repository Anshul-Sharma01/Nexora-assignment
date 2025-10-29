import { CartItem } from "../models/cartItem.model.js";
import { Product } from "../models/Product.model.js";

export class CheckoutService {
  async checkout(userId, cartItems) {
    let items = cartItems;

    if (!items || items.length === 0) {
      items = await CartItem.find({ userId }).populate("productId");
    }

    let total = 0;
    const receiptItems = [];

    for (const item of items) {
      const product = item.productId ? item.productId : await Product.findById(item.productId);
      if (!product) continue;
      const qty = item.qty || item.quantity;
      const subtotal = product.price * qty;
      total += subtotal;
      receiptItems.push({
        name: product.name,
        qty: qty,
        price: product.price,
      });
    }

    await CartItem.deleteMany({ userId });

    return {
      orderId: `ORDER-${Date.now()}`,
      items: receiptItems,
      total: Number(total.toFixed(2)),
      timestamp: new Date().toISOString(),
      message: "Checkout successful (mock)",
    };
  }
}
