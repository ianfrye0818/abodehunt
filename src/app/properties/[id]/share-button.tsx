'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { RWebShare } from 'react-web-share';

export default function ShareButton({ text }: { text: string }) {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div>
      <RWebShare
        sites={['facebook', 'twitter', 'copy']}
        data={{
          title: 'Check out this property!',
          text,
          url,
        }}
        onClick={() =>
          toast({
            description: 'Shared!',
            variant: 'success',
          })
        }
      >
        <Button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center gap-2'>
          <FaShare /> Share Property
        </Button>
      </RWebShare>
    </div>
  );
}
