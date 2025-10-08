import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected Successfully done✅");
  } catch (err) {
    console.log("MongoDb Connection Failed ❌", err);
    process.exit(1);
  }
};

export default connectDB;
