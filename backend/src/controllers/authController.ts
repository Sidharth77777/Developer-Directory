import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.ts";
import { generateToken } from "../lib/generateToken.ts";

export const signUp = async(req:Request, res:Response) => {
    try {
        const { email, name, password } = req.body as {
            email?: string,
            name?: string,
            password?: string,
        }

        if (!email || !name || !password) {
            return res.status(400).json({ success:false, message:"Name, Email and Password are required !" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success:false, message:"Password must be greater than 6 characters !" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success:false, message:"Email already in use !" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password:hashedPassword,
        });

        const token = generateToken(user._id.toString());

        return res.status(201).json({
            success: true,
            message: "SignUp Successfull !",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });

    } catch (err:any) {
        console.error("Signup error:", err);

        if (err.code === 11000) {
            return res.status(409).json({ success:false, message: "Email already in use !" });
        }

        return res.status(500).json({ success:false, message: "Internal server error !" });
    }
}

export const login = async(req:Request, res:Response) => {
    try {
        const { email, password } = req.body as {
            email?: string,
            password?: string,
        }

        if (!email || !password) {
            return res.status(400).json({ success:false, message:"Email and Password are required !" });
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success:false, message:"Invalid Email or Password !" });
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success:false, message:"Invalid Email or Password !" });
        }

        const token = generateToken(user._id.toString());

        return res.status(200).json({
            success: true,
            message: "Login Successfull !",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        })

    } catch (err:any) {
        console.error("Login error:", err);

        return res.status(500).json({ success:false, message: "Internal server error !" });
    }
}

