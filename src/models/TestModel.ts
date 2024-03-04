import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  location: String,
});

const TestModel = mongoose.model('Test', TestSchema);

export default TestModel;
