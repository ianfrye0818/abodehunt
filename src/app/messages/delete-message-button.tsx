'use client';

import { Button } from '@/components/ui/button';
import { deleteMessage } from './messageActions';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

export default function DeleteMesageButton({ messageId }: { messageId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  async function handleDelete() {
    try {
      setIsSubmitting(true);
      const deleted = await deleteMessage(messageId);
      if (deleted) {
        toast({
          description: 'Message deleted successfully',
          variant: 'success',
          duration: 3000,
        });
      } else throw new Error('Error deleting message');
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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      disabled={isSubmitting}
      className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md '
      onClick={handleDelete}
    >
      {isSubmitting ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
