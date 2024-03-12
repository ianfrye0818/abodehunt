// import connectToDB from '@/db';
// import Property from '@/models/Property';
// import { NextRequest } from 'next/server';

// export async function GET(request: NextRequest) {
//   const url = new URL(request.url);
//   const bookmarks = url.searchParams.get('bookmarks')?.split(',');

//   try {
//     await connectToDB();

//     // Convert comma-separated string of IDs to an array
//     if (!bookmarks) return new Response('No bookmarks provided', { status: 400 });

//     // Fetch properties for all IDs
//     const properties = await Property.find({ _id: { $in: bookmarks } });
//     // If any ID does not correspond to a property, return 404
//     if (!properties || properties.length === 0)
//       return new Response('Properties not found', { status: 404 });

//     // Return the found properties
//     return new Response(JSON.stringify(properties), { status: 200 });
//   } catch (error) {
//     console.error('Error getting properties', error);
//     return new Response('Error getting properties', { status: 500 });
//   }
// }
