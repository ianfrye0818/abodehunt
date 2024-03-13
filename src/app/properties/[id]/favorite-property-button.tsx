'use client';

import { updateFavorites } from '@/actions/propertyActions';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';

export default function FavoritePropertyButton({
  propertyId,
  isFavorite,
}: {
  propertyId: string;
  isFavorite: boolean;
}) {
  return (
    <Button
      onClick={async () => {
        await updateFavorites(propertyId);
      }}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center gap-2'
    >
      <HeartIcon size={16} />
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  );
}
