import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;
