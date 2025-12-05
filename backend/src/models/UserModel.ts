import mongoose, {type HydratedDocument, type InferSchemaType, Schema} from "mongoose";

const userSchema = new Schema({
    name: { type:String, required:true, trim:true },
    email: { type:String, required:true, trim:true, lowercase:true, unique:true },
    // Hashed Password
    password: { type:String, required:true },
   
}, { timestamps: true });

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

const UserModel = mongoose.model<User>("Dev_User", userSchema);

export default UserModel;