import mongoose, { ConnectOptions } from 'mongoose';

const connectToDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;
