'use server';

import { contactFormDataSchema } from '@/lib/schema';
import { z } from 'zod';

type contactFormInputs = z.infer<typeof contactFormDataSchema>;

export async function handleContactFormSubmit(formdata: contactFormInputs) {
  const result = contactFormDataSchema.safeParse(formdata);
  if (result.success) {
    console.log(result.data);
  } else {
    console.log(result.error.errors);
  }
  return { message: 'Message sent!' };
}
