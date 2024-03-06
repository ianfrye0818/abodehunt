import mongoose from 'mongoose';
let connected = false;

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  //if connected return
  if (connected) {
    console.log('Already connected to DB');
    return;
  }
  //connect to db
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB', error);
  }
};

export default connectToDB;
