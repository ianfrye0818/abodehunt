// 'use client';
// import { Message } from '@/types';
// import { useUser } from '@clerk/nextjs';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';

// const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
// export default function Messages() {
//   const { user } = useUser();
//   const queryClient = useQueryClient();

//   const {
//     data: messages,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['messages'],
//     queryFn: async () => {
//       const response = await axios.get(`${apiDomain}/messages?userId=${user?.id}`);
//       return response?.data as Message[] | undefined;
//     },
//     enabled: !!user,
//   });

//   // const deleteMutation = useMutation({
//   //   mutationFn: async (id: string) => {
//   //     const result = await deleteMessage(id);
//   //     return result;
//   //   },
//   //   onMutate: async (messageId: string) => {
//   //     const newMessage = messages?.find((message) => message._id === messageId);
//   //     await queryClient.cancelQueries({ queryKey: ['messages'] });
//   //     const previousMesssages = queryClient.getQueryData<Message[]>(['messages']);
//   //     queryClient.setQueryData<Message[] | undefined>(['messages'], (old) => {
//   //       return old?.filter((message) => message._id !== newMessage?._id);
//   //     });
//   //     return { previousMesssages };
//   //   },
//   //   onError: (err, newMessage, context: any) => {
//   //     queryClient.setQueryData<Message[] | undefined>(['messages'], context.previousMessages);
//   //   },
//   //   onSettled: () => {
//   //     queryClient.invalidateQueries({ queryKey: ['messages'] });
//   //   },
//   // });

//   // const updateMessageMutation = useMutation({
//   //   mutationFn: async (id: string) => {
//   //     const message = messages?.find((message) => message._id === id);
//   //     if (message) {
//   //       const result = await updateMessage(id, message.read);
//   //       return result;
//   //     }
//   //   },
//   //   onMutate: async (messageId: string) => {
//   //     const newMessage = messages?.find((message) => message._id === messageId);
//   //     await queryClient.cancelQueries({ queryKey: ['messages'] });
//   //     const previousMesssages = queryClient.getQueryData<Message[]>(['messages']);
//   //     queryClient.setQueryData<Message[] | undefined>(['messages'], (old) => {
//   //       return old?.map((message) => {
//   //         if (message._id === newMessage?._id) {
//   //           message.read = !message.read;
//   //         }
//   //         return message;
//   //       });
//   //     });
//   //     return { previousMesssages };
//   //   },
//   //   onError: (err, newMessage, context: any) => {
//   //     queryClient.setQueryData<Message[] | undefined>(['messages'], context.previousMessages);
//   //   },
//   //   onSettled: () => {
//   //     queryClient.invalidateQueries({ queryKey: ['messages'] });
//   //   },
//   // });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error || !messages || messages.length === 0) {
//     return <div>No messages found</div>;
//   }

//   return (
//     <div>
//       {messages.map((message) => (
//         <section
//           className='bg-blue-50'
//           key={message._id}
//         >
//           <div className='container m-auto py-24 max-w-6xl'>
//             <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
//               <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

//               <div className='space-y-4'>
//                 <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
//                   <h2 className='text-xl mb-4'>
//                     <span className='font-bold'>Property Inquiry:</span>
//                     Boston Commons Retreat
//                   </h2>
//                   <p className='text-gray-700'>
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati libero nobis
//                     vero quos aspernatur nemo alias nam, odit dolores sed quaerat illum impedit
//                     quibusdam officia ad voluptatibus molestias sequi? Repudiandae!
//                   </p>

//                   <ul className='mt-4'>
//                     <li>
//                       <strong>Name:</strong> John Doe
//                     </li>

//                     <li>
//                       <strong>Reply Email:</strong>
//                       <a
//                         href='mailto:recipient@example.com'
//                         className='text-blue-500'
//                       >
//                         recipient@example.com
//                       </a>
//                     </li>
//                     <li>
//                       <strong>Reply Phone:</strong>
//                       <a
//                         href='tel:123-456-7890'
//                         className='text-blue-500'
//                       >
//                         123-456-7890
//                       </a>
//                     </li>
//                     <li>
//                       <strong>Received:</strong>1/1/2024 12:00 PM
//                     </li>
//                   </ul>
//                   <button
//                     // onClick={async () => await updateMessageMutation.mutateAsync(message._id)}
//                     className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
//                   >
//                     Mark As Read
//                   </button>
//                   <button
//                     // onClick={async () => await deleteMutation.mutateAsync(message._id)}
//                     className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }
'use client';
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
import { Message } from '@/types';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useOptimistic, useState } from 'react';

export default function Messages() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log(user?.id);
    setError(false);
    if (!user) {
      setError(true);
      return;
    }
    fetch(`${apiDomain}/messages?userId=user_2dK1yuZTDQgtNnyxr49YgcpEwWI`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => {
        setError(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching messages</div>;
  }
  if (!messages || messages.length === 0) {
    return <div>No messages found</div>;
  }

  return (
    <div>
      {messages.map((message) => {
        return (
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati libero
                      nobis vero quos aspernatur nemo alias nam, odit dolores sed quaerat illum
                      impedit quibusdam officia ad voluptatibus molestias sequi? Repudiandae!
                    </p>

                    <ul className='mt-4'>
                      <li>
                        <strong>Name:</strong> John Doe
                      </li>

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
                    <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
                      Mark As Read
                    </button>
                    <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
