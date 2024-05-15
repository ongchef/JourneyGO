import { Storage } from "@google-cloud/storage";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const credentials = JSON.parse(process.env.GCS_CREDENTIALS_JSON);

const storage = new Storage({
    credentials: credentials
});
const bucket = storage.bucket('journeygo_photo');

export const uploadPhoto = async(file) => {
    const newFilename = `${crypto.randomUUID()}-${file.originalname}`;

    const blob = bucket.file(newFilename);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
        blobStream.on('error', error => {
            reject({message:error.message});
        });
    
        blobStream.on('finish', () => {
            const imageUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`;
            resolve({url:imageUrl, filename:blob.name});
        });
        blobStream.end(file.buffer);
    });
};