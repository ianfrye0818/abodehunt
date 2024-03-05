import connectToDB from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import Property from '@/models/Property';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectToDB();
    const property = await Property.findById(id);
    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error },
      { status: 500, statusText: 'Something went wrong, please try again!' }
    );
  }
}
