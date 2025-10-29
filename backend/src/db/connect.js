import mongoose from "mongoose"

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB connected")
    }catch(err){
        console.error("Mongodb Connection error : ", err.message);
        process.emit(1);
    }
}

