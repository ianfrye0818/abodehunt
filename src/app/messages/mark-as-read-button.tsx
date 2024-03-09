'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { updateMessage } from './messageActions';

export default function MarkAsReadButton({
  messageId,
  read,
}: {
  messageId: string;
  read: boolean;
}) {
  return (
    <Button
      className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
      onClick={async () => {
        await updateMessage(messageId, read);
      }}
    >
      {read ? 'Mark as Unread' : 'Mark as Read'}
    </Button>
  );
}
