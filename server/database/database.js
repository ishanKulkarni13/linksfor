import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to DB`);
    } catch (error) {
        console.log(`Error connecting to DB:`, error);
    }
}

export default connectDB;