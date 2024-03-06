import connectToDB from '@/db';
import Property from '@/models/Property';
import { NextRequest } from 'next/server';

//GET /api/properties/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const property = await Property.findById(params.id);
    if (!property) return new Response('Property not found', { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error('Error getting properties', error);
    return new Response('Error getting properties', { status: 500 });
  }
}
