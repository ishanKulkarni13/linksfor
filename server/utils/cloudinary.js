import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log(`localFilePath is not provided to uploadToCloudinary`);
            return null
        }
        const isUrl = localFilePath.startsWith('http://') || localFilePath.startsWith('https://');
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        if (!isUrl) { fs.unlinkSync(localFilePath) }
        return response;
    } catch (error) {
        console.log(`error occured in uploadToCloudinary`, error);
        if (!isUrl) { fs.unlinkSync(localFilePath) }
        return null;
    }
}



