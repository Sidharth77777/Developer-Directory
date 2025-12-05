import mongoose, {type HydratedDocument, type InferSchemaType, Schema} from "mongoose";

const developerSchema = new Schema({
    createdBy: { type:Schema.Types.ObjectId, ref:"Dev_User", required:true } , 
    name: { type:String, required:true, trim:true },
    role: {
        type: String,
        enum: ["Frontend", "Backend", "Full-Stack"],
        required: true,
    },
    techStack: { type:[String], required:true },
    experience: { type:Number, required:true, min:0 },

    description: { type:String, required:true, trim:true },
    joiningDate: { type:Date, required:true },
    photoUrl: { type:String, default:"" }
   
}, { timestamps: true });

export type Developer = InferSchemaType<typeof developerSchema>;
export type DeveloperDocument = HydratedDocument<Developer>;

const DeveloperModel = mongoose.model<Developer>("Developer", developerSchema);

export default DeveloperModel;