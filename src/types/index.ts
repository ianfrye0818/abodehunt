import { z } from 'zod';
import { Schema } from 'mongoose';

export const PropertySchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string().min(1, 'Property type is required'),
  owner: z.any(),
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
  amenities: z.any(),
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
  images: z.any(),
  is_featured: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PropertyFormSchema = PropertySchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export const MessageSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  message: z.string(),
  propertyOwnerId: z.string(),
  propertyId: z.string(),
  read: z.boolean().default(false),
  propertyName: z.string(),
  createdAt: z.string(),
});

export const contactFormDataSchema = MessageSchema.omit({ _id: true, createdAt: true });
export type Message = z.infer<typeof MessageSchema>;

export type Property = z.infer<typeof PropertySchema>;
export type contactFormInputs = z.infer<typeof contactFormDataSchema>;
export type propertyFormInputs = z.infer<typeof PropertyFormSchema>;

export type MapResults = {
  status:
    | 'ok'
    | 'zero_results'
    | 'over_query_limit'
    | 'request_denied'
    | 'invalid_request'
    | 'unknown_error';
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    place_id: string;
    types: string[];
  }[];
};
