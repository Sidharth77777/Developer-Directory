import mongoose from "mongoose";
import { ENV } from "../lib/ENV.ts";

export const connectDB = async (): Promise<void> => {
    try {
        if (!ENV.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const db = await mongoose.connect(ENV.MONGODB_URI);

        if (db) {
            console.log("MongoDB connected successfully");
        } 
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
}
}