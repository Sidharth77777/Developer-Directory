import { z } from "zod"

export const signupValidate = z.object({
    email: z.string().email("Invalid Email Format"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginValidate = z.object({
    email: z.string().email("Invalid Email Format"),
    password: z.string().min(1, "Password is required"),
});

export const developerValidate = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.enum(["Frontend", "Backend", "Full-Stack"]),
    techStack: z.union([
        z.string().min(1, "Tech Stack is required"),
        z.array(z.string().min(1, "Tech Stack is required"))
    ]),
    experience: z.coerce.number().nonnegative("Experience must be >= 0"),

    description: z.string().min(1, "Description is required"),
    joiningDate: z.string().min(1, "Joining date is required"),
    photoUrl: z.string().url().optional().or(z.literal("")),
});

export const developerUpdateValidate = developerValidate.partial();