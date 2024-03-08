import mongoose from 'mongoose';

const meessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    propertyOwnerId: {
      type: String,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message', meessageSchema);

export default Message;
