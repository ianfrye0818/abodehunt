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

//PUT /api/properties/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  try {
    await connectToDB();
    const property = await Property.findByIdAndUpdate(id, body);
    if (!property) return new Response('Property not found', { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error('Error updating properties', error);
    return new Response(JSON.stringify('An error occurred'), { status: 500 });
  }
}

//DELETE /api/properties/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectToDB();
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return new Response(JSON.stringify('Property not found'), { status: 404 });
    }
    return new Response(JSON.stringify('Property deleted successfully'), { status: 200 });
  } catch (error) {
    console.error('Error deleting properties', error);
    return new Response(JSON.stringify('An error occurred'), { status: 500 });
  }
}
