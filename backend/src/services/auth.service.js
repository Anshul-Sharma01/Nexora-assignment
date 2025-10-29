import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class AuthService{
    async signup(name, email, password){
        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw new Error("User already exists !!");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name, email, 
            password : hashedPassword
        });
        await user.save();
        return this.generateToken(user);
    }

    async login(email, password){
        const user = await User.findOne({ email });
        if(!user){
            throw new Error("Invalid Credentials !!");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            throw new Error("Invalid email or password !!");
        }
        return this.generateToken(user);
    }

    generateToken(user){
        return jwt.sign({
            id : user._id,
            email : user.email
        }, process.env.JWT_SECRET,{ expiresIn : "7d" });
    }
}