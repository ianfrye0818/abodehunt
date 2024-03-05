import connectToDB from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import Property from '@/models/Property';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
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
