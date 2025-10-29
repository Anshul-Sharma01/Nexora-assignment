import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    quantity : {
        type : Number,
        default : 1,
        min : [1, "The quantity can't be 0 or negative"]
    },
    
})

export const CartItem = mongoose.model("CartItem", cartItemSchema);

