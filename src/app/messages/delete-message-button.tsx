'use client';

import { Button } from '@/components/ui/button';
import { deleteMessage } from './messageActions';
import { useToast } from '@/components/ui/use-toast';

export default function DeleteMesageButton({ messageId }: { messageId: string }) {
  const { toast } = useToast();
  return (
    <Button
      className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md '
      onClick={async () => {
        const success = await deleteMessage(messageId);
        if (success.message === 'Message deleted!') {
          toast({
            description: 'Message Deleted Successfully',
          });
        } else {
          toast({
            description: 'Error Deleting Message',
            variant: 'destructive',
          });
        }
      }}
    >
      Delete
    </Button>
  );
}
