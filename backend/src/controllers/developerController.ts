import DeveloperModel from "../models/DeveloperModel.ts";
import { type Request, type Response } from "express";

export const createDeveloper = async (req: Request, res: Response) => {
    try {
        let { name, role, techStack, experience } = req.body;

        // Check if all fields are provided
        if (!name || !role || !techStack || experience === null || experience === undefined) {
            return res.status(400).json({ success: false, message: "All Fields are required !" });
        }

        const existingDev = await DeveloperModel.findOne({
            name: name.trim(),
            role,
        });

        if (existingDev) {
            return res.status(409).json({
                success: false,
                message: "Developer already exists with this name and role!",
            });
        }

        const experienceNumber: number = Number(experience);
        if (Number.isNaN(experienceNumber) || experienceNumber < 0) {
            return res.status(400).json({ success: false, message: "Experience must be a non-negative number !" });
        }

        let techArray: string[];
        if (typeof techStack === "string") {
            techArray = techStack.split(",")
                .map((t: string) => t.trim())
                .filter((t: string) => t.length > 0)
        } else if (Array.isArray(techStack)) {
            techArray = techStack.map((t: string) => String(t).trim()).filter(Boolean)
        } else {
            return res.status(400).json({ success: false, message: "Tech Stacks must be a comma-seperated string or array !" });
        }

        //Create Developer
        const newDev = await DeveloperModel.create({
            name: name.trim(),
            role,
            techStack: techArray,
            experience: experienceNumber,
        })

        return res.status(201).json({ success: true, message: "Developer Created Successfully", data: newDev });

    } catch (err: any) {
        console.error(err?.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
}

// export const getAllDevelopers = async (req: Request, res: Response) => {
//     try{
//         const developers =  await DeveloperModel.find().sort({ createdAt: -1 });
//         return res.status(200).json({ success:true, length:developers.length, message:"Developers fetched successfully", data:developers });

//     } catch(err:any) {
//         console.error(err?.message);
//         return res.status(500).json({ success:false, message:"Server Error", error:err.message });
//     }
// }

export const getAllDevelopers = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const developers = await DeveloperModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

        const total = await DeveloperModel.countDocuments();

        res.status(200).json({
            success: true,
            message: "Developers fetched successfully",
            length: developers.length,
            data: developers,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err: any) {
        console.error(err?.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
};


export const getDevelopersByQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, techStack } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const query: any = {};

    if (role && typeof role === "string" && role !== "All") {
      query.role = role;
    }

    if (techStack && typeof techStack === "string") {
      query.techStack = { $regex: techStack.trim(), $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [developers, total] = await Promise.all([
      DeveloperModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      DeveloperModel.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Developers fetched successfully",
      data: developers,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    console.error(err?.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message,});}
};
