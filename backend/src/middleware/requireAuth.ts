import { type Response, type NextFunction } from "express";
import type { AuthRequest, JWTpayload } from "../lib/types.ts";
import jwt from "jsonwebtoken";
import { ENV } from "../lib/ENV.ts";

export const requireAuth = async( req:AuthRequest, res:Response, next:NextFunction ) => {
    try {
        const header = req?.headers?.authorization || req?.headers?.Authorization;

        if (!header || typeof header !== "string") {
            return res.status(401).json({ success:false, message: "Authorization header missing" });
        }

        const [scheme, token] = header.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ success:false, message: "Invalid Authorization format" });
        }

        const decodedToken = jwt.verify(token, ENV.JWT_SECRET) as JWTpayload;

        req.user = { id: decodedToken.userId };

        return next();
    } catch (err:any) {
        console.error("Auth error:", err);
        return res.status(401).json({ success:false, message: "Invalid or expired token" });
    }
}