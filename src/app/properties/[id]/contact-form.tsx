'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormDataSchema, contactFormInputs } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { createMessage } from '@/app/messages/messageActions';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

type contactFormProps = {
  propertyOwner: string;
  propertyId: string;
  propertyName: string;
};

export default function ContactForm({ propertyOwner, propertyId, propertyName }: contactFormProps) {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    reset,

    formState: { isSubmitting, errors },
  } = useForm<contactFormInputs>({ resolver: zodResolver(contactFormDataSchema) });

  const onSubmit = async (data: contactFormInputs) => {
    try {
      const messageSent = await createMessage(data);
      if (messageSent.message.error) {
        throw new Error(messageSent.message.error as string);
      }
      toast({
        description: messageSent.message.success as string,
        variant: 'success',
        duration: 3000,
      });
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: 'error',
          duration: 3000,
        });
      } else {
        console.error(error);
        toast({
          description: 'An error occurred',
          variant: 'error',
          duration: 3000,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
      <div className='mb-4'>
        <Label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'
        >
          Name:
        </Label>
        <Input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='name'
          type='text'
          placeholder='Enter your name'
          {...register('name')}
        />
        {errors.name && <p className='text-red-500 text-sm my-2'>{errors.name.message}</p>}
      </div>
      <div className='mb-4'>
        <Label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='email'
        >
          Email:
        </Label>
        <Input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='email'
          type='text'
          placeholder='Enter your email'
          {...register('email')}
        />
        {errors.email && <p className='text-red-500 text-sm my-2'>{errors.email.message}</p>}
      </div>
      <div className='mb-4'>
        <Label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='phone'
        >
          Phone:
        </Label>
        <Input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='phone'
          type='text'
          placeholder='Enter your phone number'
          {...register('phone')}
        />
        {errors.phone && <p className='text-red-500 text-sm my-2'>{errors.phone.message}</p>}
      </div>
      <div className='mb-4'>
        <Label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='message'
        >
          Message:
        </Label>
        <Textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
          id='message'
          placeholder='Enter your message'
          {...register('message')}
        />
        {errors.message && <p className='text-red-500 text-sm my-2'>{errors.message.message}</p>}
        <Input
          type='hidden'
          value={propertyOwner}
          {...register('propertyOwnerId')}
        />
        <Input
          type='hidden'
          value={propertyId}
          {...register('propertyId')}
        />
        <Input
          type='hidden'
          value={propertyName}
          {...register('propertyName')}
        />
      </div>
      <div>
        <button
          disabled={isSubmitting}
          className='flex gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center'
        >
          {isSubmitting ? <FaSpinner className='animate-spin' /> : <FaPaperPlane />}
          <span>Send Message</span>
        </button>
      </div>
    </form>
  );
}
