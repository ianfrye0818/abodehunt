'use server';
import Test from '@/models/TestModel';
import mongoose from 'mongoose';

export const handleSubmit = async (formData: FormData) => {
  const location = formData.get('location');
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(async () => {
      console.log('Connected to MongoDB');
      const test = await Test.create({ location });
      console.log(test);
    })
    .catch((error) => console.error(error))
    .finally(() => mongoose.disconnect());
};
