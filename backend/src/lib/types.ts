import type { Request } from "express"
import type { Developer } from "../models/DeveloperModel.ts";

export interface JWTpayload {
    userId: string
}

export interface AuthRequest extends Request {
    user?: {
        id: string
    }
}

export type DevWithUser = Developer & {
  createdBy: { name: string; email: string };
};