'use client';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { deleteProperty } from '@/actions/propertyActions';
import { FaTrashCan } from 'react-icons/fa6';

export default function DeletePropertyDialog({ propertyId }: { propertyId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleDelete = async () => {
    setIsSubmitting(true);
    const deleted = await deleteProperty(propertyId);
    if (deleted.message.success) {
      router.push('/properties');
      toast({
        description: deleted.message.success,
        variant: 'success',
        duration: 3000,
      });
    } else {
      toast({
        description: deleted.message.error,
        variant: 'error',
        duration: 3000,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          disabled={isSubmitting}
          className='bg-red-600 hover:bg-red-700 text-white hover:text-white p-2 rounded-lg'
        >
          <div className='flex gap-2 items-center'>
            <FaTrashCan /> Delete Propety
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your your property and
              remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-600 hover:bg-red-700'
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
