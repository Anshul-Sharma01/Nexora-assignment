import { CartItem } from "../models/cartItem.model.js";
import { Product } from "../models/Product.model.js";



export class CartService{
    async getCart(userId){
        const cart = await CartItem.find({ userId }).populate("productId");
        const total = cart.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
        );
        return { cart, total };
    }

    async addToCart(userId, productId, quantity){
        const existingItem = await CartItem.findOne({ userId, productId });
        if(existingItem){
            existingItem.quantity += quantity;
            await existingItem.save();
            return existingItem;
        }
        const newItem = new CartItem({ userId, productId, quantity : qty });
        return await newItem.save();
    }

    async removeFromCart(userId, itemId){
        return await CartItem.findOneAndDelete({ _id : itemId, userId });
    }
}



