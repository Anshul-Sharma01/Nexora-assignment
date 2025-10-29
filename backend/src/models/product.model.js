import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    price : {
        type : Number,
        min : [0, "Price can't be negative"]
    },
    description : {
        type : String
    },
    category : {
        type : String
    },
    image : {
        type : String
    }
})

export const Product = mongoose.model("Product", productSchema);


