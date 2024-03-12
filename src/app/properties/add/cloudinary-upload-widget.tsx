'use client';
import { Button } from '@/components/ui/button';
import { CldImage, CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

type CloudinaryUploadWidgetProps = {
  setImageIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CloudinaryUploadWidget({ setImageIds }: CloudinaryUploadWidgetProps) {
  return (
    <Button asChild>
      <CldUploadButton
        options={{ maxFiles: 4, maxImageFileSize: 10000000, sources: ['local', 'unsplash', 'url'] }}
        uploadPreset='aptjvwkn'
        onSuccess={(results) => {
          const imageUploadPublicId = (results.info as CloudinaryUploadWidgetInfo).public_id;
          if (!imageUploadPublicId) throw new Error('No public_id');
          setImageIds((prev) => [...prev, imageUploadPublicId]);
        }}
      />
    </Button>
  );
}

type CloudinaryImageComponentProps = {
  image: string;
  alt: string;
};

export function CloudinaryImageComponent({
  image,
  alt = 'Property Image',
}: CloudinaryImageComponentProps) {
  return (
    <div>
      <CldImage
        src={image}
        alt={alt}
        sizes={'100vw'}
        width={960}
        height={540}
        crop='fit'
      />
    </div>
  );
}
