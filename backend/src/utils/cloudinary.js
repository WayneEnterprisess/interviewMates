import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import { asyncHandler } from './asyncHandler.js';


const uploadOnCloudinary = async(localFilePath)=>{
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("entered upload function");

        if (!process.env.CLOUDINARY_API_KEY) {
            throw new Error("Cloudinary API key is missing from environment variables.");
        }

        if (!localFilePath) return null;

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded successfully:");
        await fs.unlink(localFilePath);
        return res;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        await fs.unlink(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary}