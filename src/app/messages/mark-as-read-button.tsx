'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { updateMessage } from './messageActions';
import { useToast } from '@/components/ui/use-toast';

export default function MarkAsReadButton({
  messageId,
  read,
}: {
  messageId: string;
  read: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  async function handleUpdateMessage() {
    try {
      setIsSubmitting(true);
      const updated = await updateMessage(messageId, read);
      if (!updated || updated.message.error)
        throw new Error(updated.message.error ?? 'Error updating message');
      toast({
        description: updated.message.success as string,
        variant: 'success',
        duration: 3000,
      });
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
  let buttonText;
  if (isSubmitting) {
    buttonText = 'Updating...';
  } else if (read) {
    buttonText = 'Mark as Unread';
  } else {
    buttonText = 'Mark as Read';
  }

  return (
    <Button
      disabled={isSubmitting}
      className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
      onClick={handleUpdateMessage}
    >
      {buttonText}
    </Button>
  );
}
