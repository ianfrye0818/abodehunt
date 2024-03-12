import { CloudinaryImageComponent } from '@/app/properties/add/cloudinary-upload-widget';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function ImageCarousel({ images }: { images: string[] }) {
  return (
    <Carousel className='w-full max-w-[480px]'>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6 relative'>
                  <CloudinaryImageComponent
                    image={image}
                    alt='Property Image'
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
