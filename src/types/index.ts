import { z } from 'zod';

export const PropertySchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  owner: z.string(),
  description: z.string().optional(),
  location: z.object({
    street: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zipcode: z
      .string()
      .min(5, 'Zipcode must be 5 characters')
      .max(5, 'Zipcode must be 5 characters'),
  }),
  beds: z.coerce.number(),
  baths: z.coerce.number(),
  square_feet: z.coerce.number(),
  amenities: z.array(z.string()).min(1),
  rates: z.object({
    nightly: z.coerce.number().optional(),
    weekly: z.coerce.number().optional(),
    monthly: z.coerce.number().optional(),
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

const PropertyFormSchema = PropertySchema.omit({ _id: true, images: true });

export const contactFormDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  propertyOwnerId: z.string(),
});

export type Property = z.infer<typeof PropertySchema>;
export type contactFormInputs = z.infer<typeof contactFormDataSchema>;
export type propertyFormInputs = z.infer<typeof PropertyFormSchema>;
