import MessageButtons from '@/components/forms/message-buttons';

import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { Input } from 'postcss';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
async function fetchMessage(userId: string): Promise<Message[]> {
  try {
    const response = await axios.get(`${apiDomain}/messages/`, {
      params: {
        userId,
      },
    });
    if (!response.data) return [];
    return response.data as Message[];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export default async function Messages() {
  const user = await currentUser();
  const messages = await fetchMessage(user?.id as string);
  console.log(messages);

  if (!messages || messages.length === 0) return <div>No messages found</div>;

  async function markreadUnread(formdata: FormData) {
    'use server';
    const id = formdata.get('id');
    const read = formdata.get('read');
    await axios.put(`${apiDomain}/messages/${id}`, {
      read: read === 'true' ? false : true,
    });
    revalidatePath('/messages');
  }

  async function handleDelete(formdata: FormData) {
    'use server';
    const id = formdata.get('id');
    await axios.delete(`${apiDomain}/messages/${id}`);
    revalidatePath('/messages');
  }

  return (
    <div>
      {messages.map((message) => (
        <section
          className='bg-blue-50'
          key={message._id}
        >
          <div className='container m-auto py-24 max-w-6xl'>
            <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
              <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

              <div className='space-y-4'>
                <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                  <h2 className='text-xl mb-4'>
                    <span className='font-bold'>Property Inquiry:</span>
                    Boston Commons Retreat
                  </h2>
                  <p className='text-gray-700'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati libero nobis
                    vero quos aspernatur nemo alias nam, odit dolores sed quaerat illum impedit
                    quibusdam officia ad voluptatibus molestias sequi? Repudiandae!
                  </p>

                  <ul className='mt-4'>
                    <li>
                      <strong>Name:</strong> John Doe
                    </li>
                    <li>{message.read.toString()}</li>
                    <li>
                      <strong>Reply Email:</strong>
                      <a
                        href='mailto:recipient@example.com'
                        className='text-blue-500'
                      >
                        recipient@example.com
                      </a>
                    </li>
                    <li>
                      <strong>Reply Phone:</strong>
                      <a
                        href='tel:123-456-7890'
                        className='text-blue-500'
                      >
                        123-456-7890
                      </a>
                    </li>
                    <li>
                      <strong>Received:</strong>1/1/2024 12:00 PM
                    </li>
                  </ul>
                  <div>
                    <form action={markreadUnread}>
                      <input
                        type='hidden'
                        name='id'
                        value={message._id}
                      />
                      <input
                        type='hidden'
                        name='read'
                        className='hidden'
                        value={message.read.toString()}
                      />
                      <Button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
                        {message.read ? 'Mark Unread' : 'Mark Read'}
                      </Button>
                    </form>
                    <form action={handleDelete}>
                      <input
                        type='hidden'
                        name='id'
                        value={message._id}
                      />
                      <Button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
