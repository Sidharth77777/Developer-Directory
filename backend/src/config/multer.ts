import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import  "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "developer_photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  } as any,
});

const upload = multer({ storage });

export default upload;
