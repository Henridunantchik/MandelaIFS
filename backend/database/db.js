import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI, {
            bufferCommands: false,
        });
        
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log("MongoDB connection error", error);
        throw error;
    }
}

export default connectDB;