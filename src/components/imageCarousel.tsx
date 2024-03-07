import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function ImageCarousel({ images }: { images: string[] }) {
  console.log(images);
  return (
    <Carousel className='w-full max-w-[500px]'>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6 relative'>
                  <Image
                    src={'/images/properties/' + image}
                    alt='property image'
                    fill
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
