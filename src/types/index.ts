import { z } from 'zod';

export const PropertySchema = z.object({
  name: z.string(),
  type: z.string(),
  owner: z.string(),
  description: z.string(),
  location: z.object({
    street: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
  beds: z.number(),
  baths: z.number(),
  square_feet: z.number(),
  amenities: z.array(z.string()),
  rates: z.object({
    nightly: z.number().optional(),
    weekly: z.number().optional(),
    monthly: z.number().optional(),
  }),
  seller_info: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  images: z.array(z.string()),
  is_featured: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const contactFormDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  propertyOwnerId: z.string(),
});

export type Property = z.infer<typeof PropertySchema>;
export type contactFormInputs = z.infer<typeof contactFormDataSchema>;
export type propertyFormInputs = z.infer<typeof PropertySchema>;
