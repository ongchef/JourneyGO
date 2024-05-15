import { Storage } from "@google-cloud/storage";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const credentials = JSON.parse(process.env.GCS_CREDENTIALS_JSON);
const storage = new Storage({
    credentials: credentials
});
const bucket = storage.bucket('journeygo_photo');

export default function uploadPhoto (req, res, next){
    const file  = req.file;
    // If no file
    if (!file){
        return res.status(400).json({ message: "No file"});
    }
    
    const newFilename = `${crypto.randomUUID()}-${file.originalname}`;
    const blob = bucket.file(newFilename);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', error => {
        return res.status(500).json({ message: "Upload to GCS failed"});
    });

    blobStream.on('finish', () => {
        req.filename = blob.name;
        next();
    });
    blobStream.end(file.buffer);
}