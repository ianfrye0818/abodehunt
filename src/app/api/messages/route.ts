// import connectToDB from '@/db';
// import Message from '@/models/Message';
// import { contactFormDataSchema } from '@/types';
// import { NextRequest, NextResponse } from 'next/server';

// // GET /api/messages
// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get('userId');

//   try {
//     await connectToDB();
//     // get messages from the db
//     const messages = await Message.find({ propertyOwnerId: userId });
//     if (!messages) {
//       return new NextResponse(JSON.stringify('No messages Found'), { status: 404 });
//     }
//     return new NextResponse(JSON.stringify(messages), { status: 200 });
//   } catch (error) {
//     console.error(`[GET /api/messages] ${error}`);
//     return new NextResponse(JSON.stringify('An error occurred'), { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const newMessage = contactFormDataSchema.safeParse(body);
//   if (!newMessage.success) {
//     return new NextResponse(JSON.stringify('Invalid data'), { status: 400 });
//   }

//   try {
//     await connectToDB();
//     const messagedb = await Message.create(newMessage.data);
//     return new NextResponse(JSON.stringify(messagedb), { status: 201 });
//   } catch (error) {
//     console.error(`[POST /api/messages] ${error}`);
//     return new NextResponse(JSON.stringify('An error occurred'), { status: 500 });
//   }
// }
