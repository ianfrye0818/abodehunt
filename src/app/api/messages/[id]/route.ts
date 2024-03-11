import connectToDB from '@/db';
import Message from '@/models/Message';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

//GET /api/messages/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const message = await Message.findById(params.id);
    if (!message) return new Response('Message not found', { status: 404 });
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error getting messages', { status: 500 });
  }
}

//PUT /api/messages/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  try {
    await connectToDB();

    const message = await Message.findByIdAndUpdate(id, body);

    return new NextResponse(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify('An error occurred'), { status: 500 });
  }
}

//DELETE /api/messages/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectToDB();
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return new NextResponse(JSON.stringify('Message not found'), { status: 404 });
    }
    return new NextResponse(JSON.stringify('Message deleted successfully'), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify('An error occurred'), { status: 500 });
  }
}
