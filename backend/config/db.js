import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected at database name: ${conn.connection.db.databaseName}`);
  } catch (err) {
    console.log(`Error connection with error: ${err.message}`);
  }
}

export default connectDB;