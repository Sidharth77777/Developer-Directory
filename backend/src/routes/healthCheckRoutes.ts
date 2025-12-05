import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.ts";

export const checkHealthofServer = async (req: Request, res: Response) => {
    void req;
    res.status(200).send("Server is running...");
}

export const checkHealthOfCloudinary = async (req: Request, res: Response) => {
    try {
        const result = await cloudinary.api.ping();
        res.json({ success: true, message: "Cloudinary connected!", result });
    } catch (err: any) {
        res.status(500).json({ success: false, err });
    }
}