'use server';
import connectToDB from '@/db';
import Message from '@/models/Message';
import { contactFormDataSchema, contactFormInputs } from '@/types';
import { revalidatePath } from 'next/cache';

export async function deleteMessage(id: string) {
  try {
    await connectToDB();
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) throw new Error('Error deleting message');
    return { message: { success: 'Message Deleted Successfully' } };
  } catch (error) {
    console.error(['deleteMessage', error]);
    return { message: { error: 'Error deleting message' } };
  } finally {
    revalidatePath('/messages');
  }
}

export async function updateMessage(id: string, read: boolean) {
  try {
    await connectToDB();
    const message = await Message.findByIdAndUpdate(id, { read: !read });
    if (!message) throw new Error('Error updating message');
    return { message: { success: 'Message Updated Successfully' } };
  } catch (error) {
    console.error(['updateMessage', error]);
    return { message: { error: 'Error updating message' } };
  } finally {
    revalidatePath('/messages');
  }
}

export async function createMessage(formdata: contactFormInputs) {
  //check that the messages are valid
  const result = contactFormDataSchema.safeParse(formdata);
  try {
    if (result.success) {
      await connectToDB();
      const message = await Message.create(result.data);
      if (!message) throw new Error('Error creating message');
      return { message: { success: 'Message sent successfully!' } };
    } else {
      console.error(result.error.errors);
      throw new Error('Invalid form data');
    }
  } catch (error) {
    console.error(error);
    return { message: { error } };
  } finally {
    revalidatePath('/messages');
  }
}

export async function fetchMessages(userId: string) {
  try {
    await connectToDB();
    const messages = await Message.find({ owner: userId });
    if (!messages) return [];
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return null;
  }
}

export async function fetchNumberOfUnreadMessages(userId: string) {
  try {
    await connectToDB();
    const messages = await Message.find({ owner: userId, read: false });
    if (!messages) return 0;
    return messages.length;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return 0;
  }
}
