import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//delete image from cloudinary
export const deleteImages = async (publicIds: string[]) => {
  console.log('public id:', publicIds);
  try {
    await Promise.all(
      publicIds.map(async (id) => {
        await cloudinary.uploader.destroy(id);
      })
    );
    return { message: { success: 'Images deleted successfully' } };
  } catch (error) {
    console.log(error);
    return { message: { error: 'Error deleting images' } };
  }
};
