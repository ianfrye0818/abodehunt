import connectToDB from '@/db';
import Property from '@/models/Property';
import { NextRequest } from 'next/server';
import { PropertyFormSchema } from '@/types';

//GET /api/properties
export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.error('Error getting properties', error);
    return new Response('Error getting properties', { status: 500 });
  }
}

//POST /api/properties
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProperty = PropertyFormSchema.safeParse(body);
  if (!newProperty.success) {
    return new Response(JSON.stringify('Invalid data'), { status: 400 });
  }
  try {
    await connectToDB();
    const property = await Property.create(body);
    return new Response(JSON.stringify(property), { status: 201 });
  } catch (error) {
    console.error('Error creating property', error);
    return new Response('Error creating property', { status: 500 });
  }
}
