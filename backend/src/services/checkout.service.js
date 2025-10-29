import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";

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
      const subtotal = product.price * item.quantity;
      total += subtotal;
      receiptItems.push({
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });
    }

    await CartItem.deleteMany({ userId });

    return {
      userId,
      items: receiptItems,
      total: Number(total.toFixed(2)),
      timestamp: new Date().toISOString(),
      message: "Checkout successful (mock)",
    };
  }
}
