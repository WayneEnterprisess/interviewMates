import multer from 'multer';
import path from 'path';
import fs from 'fs';


//save file path to upload
const uploadPath = path.resolve('public/temp')

// Ensure the folder exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Create the multer instance
export const upload = multer({ storage });