import axios from 'axios';
import { Message } from '@/types/index';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

async function fetchMessages(userId: string): Promise<Message[] | undefined> {
  const response = await axios.get(`${apiDomain}/messages?userId=${userId}`);
  return response.data as Message[] | undefined;
}

export { fetchMessages };
