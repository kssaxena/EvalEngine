import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connectionInitiation = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected DB HOST: ${connectionInitiation.connection.host}`
    );
  } catch (error) {
    console.log("MONGO connection error", error);
    process.exit(1);
  }
};

export default connectDB;
