'use server';
import { z } from 'zod';

import { contactFormDataSchema } from '@/lib/schema';

type contactFormInputs = z.infer<typeof contactFormDataSchema>;

export async function handleContactFormSubmit(formdata: contactFormInputs) {
  const result = contactFormDataSchema.safeParse(formdata);
  if (result.success) {
  } else {
    console.log(result.error.errors);
  }
  return { message: 'Message sent!' };
}
