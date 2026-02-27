// core/database/mongoDB.ts
import mongoose from 'mongoose';
import { Logger } from '../utils';

export const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      Logger.error("MONGODB_URI is missing in .env");
      return;
    }

    await mongoose.connect(mongoUri);
    Logger.info(`MongoDB Local connected: ${mongoose.connection.name}`); 
 
  } catch (error) {
    Logger.error("MongoDB connection failed", error);
  }
};