import mongoose from 'mongoose';
let connected = false;

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  //if connected return
  if (connected) {
    return;
  }
  //connect to db
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
  } catch (error) {
    console.error('Error connecting to DB', error);
  }
};

export default connectToDB;
