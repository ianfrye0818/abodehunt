'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { updateMessage } from './messageActions';
import { useToast } from '@/components/ui/use-toast';

export default function MarkAsReadButton({
  messageId,
  read,
}: {
  messageId: string;
  read: boolean;
}) {
  const { toast } = useToast();
  return (
    <Button
      className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
      onClick={async () => {
        const success = await updateMessage(messageId, read);
        if (success && success.message === 'Message updated!') {
          toast({
            description: 'Message Updated Successfully',
            variant: 'success',
          });
        } else {
          toast({
            description: 'Error Updating Message',
            variant: 'destructive',
          });
        }
      }}
    >
      {read ? 'Mark as Unread' : 'Mark as Read'}
    </Button>
  );
}
