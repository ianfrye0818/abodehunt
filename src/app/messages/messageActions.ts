'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
export async function deleteMessage(id: string) {
  try {
    await axios.delete(`${apiDomain}/messages/${id}`);
    revalidatePath('/messages');
    return { message: 'Message deleted!' };
  } catch (error) {
    console.error(['deleteMessage', error]);
    return { message: 'Error deleting message' };
  }
}

export async function updateMessage(id: string, read: boolean) {
  try {
    await axios.put(`${apiDomain}/messages/${id}`, { read: !read });
    revalidatePath('/messages');
    return { message: 'Message updated!' };
  } catch (error) {
    console.error(['updateMessage', error]);
  }
}
