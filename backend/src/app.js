import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


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

export default app;


