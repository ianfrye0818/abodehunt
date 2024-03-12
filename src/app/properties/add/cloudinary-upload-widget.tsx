'use client';
import { CldImage, CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

type CloudinaryUploadWidgetProps = {
  setImageIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CloudinaryUploadWidget({ setImageIds }: CloudinaryUploadWidgetProps) {
  return (
    <CldUploadButton
      uploadPreset='aptjvwkn'
      onSuccess={(results) => {
        const imageUploadPublicId = (results.info as CloudinaryUploadWidgetInfo).public_id;
        if (!imageUploadPublicId) throw new Error('No public_id');
        setImageIds((prev) => [...prev, imageUploadPublicId]);
      }}
    />
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
