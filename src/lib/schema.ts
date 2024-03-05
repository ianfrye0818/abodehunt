import { z } from 'zod';

export const contactFormDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  phone: z.string().min(10, 'Invalid Phone Number').max(10, 'Invalid Phone Number'),
  message: z.string().min(1, 'Message is required'),
});
