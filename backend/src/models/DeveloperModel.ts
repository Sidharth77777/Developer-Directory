import mongoose, {type HydratedDocument, type InferSchemaType, Schema} from "mongoose";

const developerSchema = new Schema({
    name: { type:String, required:true, trim:true },
    role: {
        type: String,
        enum: ["Frontend", "Backend", "Full-Stack"],
        required: true,
    },
    techStack: { type:[String], required:true },
    experience: { type:Number, required:true, min:0 },
   
}, { timestamps: true });

export type Developer = InferSchemaType<typeof developerSchema>;
export type DeveloperDocument = HydratedDocument<Developer>;

const DeveloperModel = mongoose.model<Developer>("Developer", developerSchema);

export default DeveloperModel;