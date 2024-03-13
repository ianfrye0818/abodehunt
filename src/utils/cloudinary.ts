import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type ResponseData = {
  asset_id: string;
  public_id: string;
  tags: string[];
  url: string;
};

//delete image from cloudinary
export const deleteImages = async (publicIds: string[]) => {
  console.log('public id:', publicIds);
  try {
    await Promise.all(
      publicIds.map(async (id) => {
        const result = await cloudinary.uploader.destroy(id);
        if (result.result !== 'ok') throw new Error('Error deleting image');
      })
    );
    return { message: { success: 'Images deleted successfully' } };
  } catch (error) {
    console.log(error);
    return { message: { error: 'Error deleting images' } };
  }
};

//add image to cloudinary
export const uploadImage = async (image: string) => {
  try {
    const data: ResponseData = await cloudinary.uploader.unsigned_upload(image, 'aptjvwkn');
    if (!data) throw new Error('Error uploading image');
    return data.public_id;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { message: { error: error.message } };
    } else {
      return { message: { error: 'Error uploading image' } };
    }
  }
};
