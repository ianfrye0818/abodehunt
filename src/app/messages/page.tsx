//library import
import { currentUser } from '@clerk/nextjs';

//component import
import DeleteMesageButton from './delete-message-button';
import MarkAsReadButton from './mark-as-read-button';
import NoMessages from './no-message';

//utility funcitons
import { fetchMessages } from '@/utils/messageRequests';
import { formatDate } from '@/utils/formatDate';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
export default async function Messages() {
  //get current user
  const user = await currentUser();
  //if no user is logged in return a message
  if (!user)
    return (
      <div className='h-screen flex flex-col justify-center items-center text-3xl'>
        Please log in to view messages{' '}
        <Button asChild>
          <SignInButton />
        </Button>
      </div>
    );
  //grab messages from the db
  const messages = await fetchMessages(user?.id as string);
  //if no messages are found return a message
  if (!messages || messages.length === 0) return <NoMessages />;

  //return the messages
  return (
    <div>
      <section className='bg-blue-50 h-screen'>
        <div className='container m-auto py-24 max-w-6xl'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 flex flex-col gap-5'>
            <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
            {messages.map((message) => {
              return (
                <div
                  className='space-y-4'
                  key={message._id}
                >
                  <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                    <h2 className='text-xl mb-4'>
                      <span className='font-bold'>Property Inquiry:</span> {message.propertyName}
                    </h2>

                    <ul className='mt-4'>
                      <li>
                        <strong>Name:</strong> {message.name}
                      </li>

                      <li>
                        <strong>Reply Email:</strong>{' '}
                        <a
                          href={`mailto:${message.email}`}
                          className='text-blue-500'
                        >
                          {message.email}
                        </a>
                      </li>
                      {message.phone && (
                        <li>
                          <strong>Reply Phone:</strong>{' '}
                          <a
                            href={`tel:${message.phone}`}
                            className='text-blue-500'
                          >
                            {message.phone}
                          </a>
                        </li>
                      )}
                      <li>
                        <strong>Received:</strong> {formatDate(message.createdAt)}
                      </li>
                    </ul>
                    <p className='text-gray-700 py-10'>{message.message}</p>
                    <MarkAsReadButton
                      messageId={message._id}
                      read={message.read}
                    />
                    <DeleteMesageButton messageId={message._id} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
