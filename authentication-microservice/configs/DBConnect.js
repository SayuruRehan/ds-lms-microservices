import { config } from 'dotenv';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectDB = async () => {
  return new Promise((resolve, reject) => {
    config();
    const uri = process.env.AUTH_MONGO_URI || '';
    if (!uri) {
      reject(new Error('MongoDB URI is not defined in Auth server'));
    }
    mongoose
      .connect(uri)
      .then(() => {
        console.log('MongoDB connected in Auth server');
        resolve();
      })
      .catch((error) => {
        console.error(error.message);
        reject(error);
      });
  });
};

export const disconnectDB = async () => {
  mongoose.disconnect().then(() => {
    console.log('MongoDB disconnected in Auth server');
  });
};