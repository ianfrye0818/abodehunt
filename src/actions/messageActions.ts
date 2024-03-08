'use server';

import connectToDB from '@/db';
import Message from '@/models/Message';
import { ObjectId } from 'mongoose';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId: ObjectId) {
  'use server';
  await connectToDB();
  try {
    await Message.findByIdAndDelete(messageId);
    revalidatePath('/messages');
  } catch (error) {
    console.error('Error deleting message:', error);
    return 'Error deleting message';
  }
}

async function markAsRead(messageId: ObjectId) {
  'use server';
  await connectToDB();
  try {
    await Message.findByIdAndUpdate(messageId, { read: true });
    revalidatePath('/messages');
  } catch (error) {
    console.error('Error marking message as read:', error);
    return 'Error marking message as read';
  }
}

export { deleteMessage, markAsRead };
