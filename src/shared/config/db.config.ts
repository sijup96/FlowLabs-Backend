import mongoose from "mongoose";
import { envConfig } from "./env.config";

export const connectDatabase = async () => {
    try {
        const mongodbURI = envConfig.MONGODB_URI;

        if (!mongodbURI) {
            throw new Error('MONGODB_URI not found in environment variables.');
        }        
        await mongoose.connect(mongodbURI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};