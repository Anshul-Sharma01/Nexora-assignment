import axios from "axios"
import { Product } from "../models/Product.model.js";

export class ProductService{
    constructor(){
        this.apiUrl = "https://fakestoreapi.com/products";
    }

    async getAllProducts(){
        const existingProducts = await Product.find();
        if(existingProducts.length > 0){
            return existingProducts;
        }

        const response = await axios.get(this.apiUrl);
        const data = response.data;

        const products = data.map((product) => ({
            name : product.title,
            price : product.price,
            description : product.description,
            category : product.category,
            image : product.image
        }));

        await Product.insertMany(products);
        return await Product.find();
    }
}