//library import
import { currentUser } from '@clerk/nextjs';

//component import
import NoMessages from './no-message';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

//utility funcitons
import MessageCard from './message-card';
import { fetchMessages } from './messageActions';

export default async function Messages() {
  //get current user
  const user = await currentUser();
  //if no user is logged in return a message
  if (!user)
    return (
      <div className='h-full flex flex-col justify-center items-center text-3xl'>
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
    <div className='bg-white h-full'>
      <section className='md:bg-blue-50 h-full'>
        <div className='md:container m-auto md:py-24 max-w-6xl'>
          <div className='bg-white px-6 py-8 mb-4 md:shadow-md rounded-md md:border md:m-0 flex flex-col gap-5 h-full'>
            <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

            {messages.map((message) => {
              return (
                <MessageCard
                  message={message}
                  key={message._id}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
