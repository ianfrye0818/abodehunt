'use client';
import { updateFavorites } from '@/actions/propertyActions';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

type FavoriteButtonProps = {
  propertyId: string;
  isFavorite?: boolean;
};

export default function FavoriteButton({ propertyId, isFavorite }: FavoriteButtonProps) {
  return (
    <Button
      onClick={async () => {
        await updateFavorites(propertyId);
      }}
      className='absolute hover:bg-gray-100 top-2 left-2 rounded-full p-2 bg-white w-8 h-8'
    >
      <FaHeart className={isFavorite ? 'text-red-500' : 'text-gray-500'} />
    </Button>
  );
}
