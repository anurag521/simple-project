import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ debug: false }); 

const MONGO_URI = process.env.MONGO_URI!;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { dbName: 'appName' });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err as Error);
        throw err;
    }
};

export default connectDB;