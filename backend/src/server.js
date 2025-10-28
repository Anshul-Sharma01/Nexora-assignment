import dotenv from "dotenv";
import app from "./app.js"
import { connectDB } from "./db/connect.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, (err) => {
        if(err){
            console.log(`Error occurred while listening to server : ${err}`)
        }else{
            console.log(`Server is listening on http://localhost:${PORT}`);
        }
    })
})