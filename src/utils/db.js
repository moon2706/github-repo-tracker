import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDB;
