import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import authRoutes from "./routes/auth.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/checkout", checkoutRoutes);



export default app;


