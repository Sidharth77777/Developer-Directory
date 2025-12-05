import jwt from "jsonwebtoken";
import { ENV } from "./ENV.js";

export const generateToken = (userId: string) => {

    if (!ENV.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    } else {
        return jwt.sign(
            { userId },
            ENV.JWT_SECRET,
            { expiresIn: "7d" }
        );
    }
    
};