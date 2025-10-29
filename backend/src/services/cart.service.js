import { CartItem } from "../models/cartItem.model.js";
import { Product } from "../models/Product.model.js";



export class CartService{
    async getCart(userId){
        const cartItems = await CartItem.find({ userId }).populate("productId");
        const items = cartItems.map(item => ({
            id: item._id,
            name: item.productId.name,
            price: item.productId.price,
            qty: item.quantity,
            productId: item.productId._id
        }));
        const total = items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );
        return { items, total };
    }

    async addToCart(userId, productId, quantity){
        const existingItem = await CartItem.findOne({ userId, productId });
        if(existingItem){
            existingItem.quantity += quantity;
            await existingItem.save();
        } else {
            const newItem = new CartItem({ userId, productId, quantity });
            await newItem.save();
        }
        
        // Return updated cart
        return await this.getCart(userId);
    }

    async removeFromCart(userId, itemId){
        return await CartItem.findOneAndDelete({ _id : itemId, userId });
    }
}



