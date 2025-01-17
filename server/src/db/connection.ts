import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL!);
    console.log(`MongoDB connection connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error on MongoDB connection failed: ${error.message}`);
  }
};
