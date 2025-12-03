import dotenv from 'dotenv';
dotenv.config({quiet:true});

export const ENV = {
    PORT: process.env.PORT || 3000 as number,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN as string,

    MONGODB_URI: process.env.MONGODB_URI as string,
}