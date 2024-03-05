import connectToDB from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import Property from '@/models/Property';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const properties = await Property.find();
    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error },
      { status: 500, statusText: 'Something went wrong, please try again!' }
    );
  }
}
