import { deleteMessage, markAsRead } from '@/actions/messageActions';
import ClientButton from '@/components/clientButton';
import connectToDB from '@/db';
import Message from '@/models/Message';
import type { Message as MessageType } from '@/types';
import { currentUser } from '@clerk/nextjs';

async function fetchMessages(): Promise<MessageType[] | []> {
  const user = await currentUser();
  if (!user) return [];
  try {
    await connectToDB();
    // grab all messages from Message collection that match the current user's id
    const messages = (await Message.find({ propertyOwnerId: user.id })) as MessageType[];

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export default async function MessagesPage() {
  const messages = await fetchMessages();
  if (!messages || messages.length === 0) {
    return (
      <div className='container m-auto py-24 max-w-6xl'>
        <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
        <p className='text-gray-700'>You have no messages at this time.</p>
      </div>
    );
  }

  return (
    <section>
      {messages.map((message) => (
        <div key={message._id}>
          <div className='container m-auto py-24 max-w-6xl'>
            <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
              <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

              <div className='space-y-4'>
                <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                  <h2 className='text-xl mb-4'>
                    <span className='font-bold'>Property Inquiry:</span>
                    {message.propertyName}
                  </h2>
                  <p className='text-gray-700'>{message.message}</p>

                  <ul className='mt-4'>
                    <li>
                      <strong>Name:</strong> {message.name}
                    </li>
                    <li>
                      <strong>Reply Email:</strong>
                      <a
                        href={`mailto:${message.email}`}
                        className='text-blue-500'
                      >
                        {message.email}
                      </a>
                    </li>
                    {message.phone && (
                      <li>
                        <strong>Reply Phone:</strong>
                        <a
                          href={`tel:${message.phone}`}
                          className='text-blue-500'
                        >
                          {message.phone}
                        </a>
                      </li>
                    )}
                    <li>
                      <strong>Received:</strong>
                    </li>{' '}
                  </ul>
                  <button
                    className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
                    formAction={async () => {
                      'use server';
                      await markAsRead(message._id);
                    }}
                  >
                    {message.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <button
                    className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
                    formAction={async () => {
                      'use server';
                      await deleteMessage(message._id);
                    }}
                  >
                    Delete Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
