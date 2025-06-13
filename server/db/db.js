import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function ConnectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db successfully connected");
  } catch (error) {
    console.error("Error while connecting to database", error);
    process.exit(1);
  }
}

export default ConnectToDB;
