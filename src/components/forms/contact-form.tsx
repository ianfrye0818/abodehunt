'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { handleContactFormSubmit } from '@/actions/actions';
import { FaPaperPlane } from 'react-icons/fa';
import { useFormState, useFormStatus } from 'react-dom';
export type contactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: contactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      <FaPaperPlane />
      Send Message
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(handleContactFormSubmit, initialState);
  return (
    <form action={formAction}>
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
        />
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
          type='email'
          placeholder='Enter your email'
        />
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
        />
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
        />
      </div>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
