import { ProductService } from "../services/product.service.js";


export class ProductController{
    constructor(){
        this.productService = new ProductService();
    }

    getAllProducts = async(req, res) => {
        try{
            const products = await this.productService.getAllProducts();
            res.json(products);
        }catch(err){
            res.status(500)
            .json({
                error : err.message
            })
        }
    }
}





