import connectToDB from '@/db';
import Property from '@/models/Property';
import { NextRequest } from 'next/server';

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
