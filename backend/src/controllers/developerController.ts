import type { AuthRequest } from "../lib/types.ts";
import DeveloperModel from "../models/DeveloperModel.js";
import { type Request, type Response } from "express";

export const createDeveloper = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const photoUrl = req.file?.path || "";

        let { name, role, techStack, experience, description, joiningDate } = req.body;

        // Check if all fields are provided
        // if (!name || !role || !techStack || experience === null || experience === undefined) {
        //     return res.status(400).json({ success: false, message: "All Fields are required !" });
        // }

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

        // const experienceNumber: number = Number(experience);
        // if (Number.isNaN(experienceNumber) || experienceNumber < 0) {
        //     return res.status(400).json({ success: false, message: "Experience must be a non-negative number !" });
        // }

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
            createdBy: userId,
            name: name.trim(),
            role,
            techStack: techArray,
            experience,
            description,
            joiningDate,
            photoUrl,
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
        const { role, techStack, search, sortByExperience } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;

        const query: any = {};

        if (role && typeof role === "string" && role !== "All") {
            query.role = role;
        }

        if (search && typeof search === "string") {
            const regex = new RegExp(search.trim(), "i");
            query.$or = [
                { name: regex },
                { techStack: { $regex: regex } },
            ];
        }

        if (!search && techStack && typeof techStack === "string") {
            query.techStack = { $regex: techStack.trim(), $options: "i" };
        }

        let sort: any = { createdAt: -1 };
        if (sortByExperience === "asc") {
            sort = { experience: 1 };
        } else if (sortByExperience === "desc") {
            sort = { experience: -1 };
        }

        const skip = (page - 1) * limit;

        const [developers, total] = await Promise.all([
            DeveloperModel.find(query)
                .sort(sort)
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
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
};

export const getDeveloperById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const dev = await DeveloperModel.findById(id).populate("createdBy", "name email");
        if (!dev) {
            return res.status(404).json({ success: false, message: "Developer not found" });
        }

        const obj = dev.toObject() as any;

        return res.status(200).json({
            success: true,
            message: "Developer found",
            data: {
                ...obj,
                createdByName: obj.createdBy?.name,
                createdByEmail: obj.createdBy?.email,
            },
        });
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Internal Server Error !", error: err.message });
    }
}

export const updateDeveloper = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const dev = await DeveloperModel.findById(id);
        if (!dev) {
            return res.status(404).json({ success: false, message: "Developer not found !" });
        }

        if (dev.createdBy.toString() !== req.user?.id) {
            return res.status(403).json({ success: false, message: "Not authorized !" });
        }

        const photoUrl = req.file?.path || dev.photoUrl || "";
        const updatedData = {
            ...req.body,
            photoUrl,
        }

        const updatedDev = await DeveloperModel.findByIdAndUpdate(
            id,
            updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedDev) {
            return res.status(404).json({ success: false, message: "Developer not found !" });
        }

        return res.status(200).json({ success: true, message: "Developer updated successfully !", data: updatedDev });

    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Internal Server Error !", error: err.message });
    }
};

export const deleteDeveloper = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const dev = await DeveloperModel.findById(id);
        if (!dev) {
            return res.status(404).json({ success: false, message: "Developer not found !" });
        }

        if (dev.createdBy.toString() !== req.user?.id) {
            return res.status(403).json({ success: false, message: "Not authorized !" });
        }

        const deletedDev = await DeveloperModel.findByIdAndDelete(id);
        if (!deletedDev) {
            return res.status(404).json({ success: false, message: "Developer not found !" });
        }

        return res.status(200).json({ success: true, message: "Developer deleted successfully !" });

    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Internal Server Error !", error: err.message });
    }
};


