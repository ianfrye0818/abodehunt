'use client';

import { Button } from '@/components/ui/button';
import { deleteMessage } from './messageActions';

export default function DeleteMesageButton({ messageId }: { messageId: string }) {
  return (
    <Button
      className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
      onClick={async () => {
        await deleteMessage(messageId);
      }}
    >
      Delete
    </Button>
  );
}
