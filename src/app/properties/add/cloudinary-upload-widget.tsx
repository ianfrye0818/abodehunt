'use client';
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

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
