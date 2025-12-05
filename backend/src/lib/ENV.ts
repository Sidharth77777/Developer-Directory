import dotenv from 'dotenv';
dotenv.config({quiet:true});

export const ENV = {
    PORT: process.env.PORT || 3000 as number,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN as string,

    MONGODB_URI: process.env.MONGODB_URI as string,

    JWT_SECRET: process.env.JWT_SECRET as string,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,

}