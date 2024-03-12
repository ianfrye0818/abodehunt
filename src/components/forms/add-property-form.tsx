'use client';
//library import
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

//component imports
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CloudinaryUploadWidget from '@/app/properties/add/cloudinary-upload-widget';

//custom imports
import { addProperty } from '@/actions/propertyActions';

//type import
import { PropertyFormSchema, propertyFormInputs } from '@/types';

export default function AddPropertyForm() {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<propertyFormInputs>({ resolver: zodResolver(PropertyFormSchema) });

  async function onSubmit(data: propertyFormInputs) {
    data.images = imageIds;
    data.amenities = amenities;
    data.owner = user?.id as string;
    try {
      const property = await addProperty(data);
      if (property?.message.success) {
        toast({
          description: property.message.success,
          variant: 'success',
        });
      } else throw new Error(property?.message.error as string);
      reset();
      router.push('/properties');
    } catch (error) {
      console.log(error);
      toast({
        description: (error as Error).message,
        variant: 'error',
      });
    }
  }
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const checked = target.checked;
    if (checked) {
      setAmenities((prev) => [...prev, value]);
    } else {
      setAmenities((prev) => prev.filter((item) => item !== value));
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Property</h2>

      <div className='mb-4'>
        <Label
          htmlFor='type'
          className='block text-gray-700 font-bold mb-2'
        >
          Property Type
        </Label>
        <select
          id='type'
          className='border rounded w-full py-2 px-3'
          {...register('type')}
        >
          <option value=''>Select a property type</option>
          <option value='Apartment'>Apartment</option>
          <option value='Condo'>Condo</option>
          <option value='House'>House</option>
          <option value='Cabin Or Cottage'>Cabin or Cottage</option>
          <option value='Room'>Room</option>
          <option value='Studio'>Studio</option>
          <option value='Other'>Other</option>
        </select>
        {errors.type && <p className='text-red-500 text-sm italic'>{errors.type.message}</p>}
      </div>
      <div className='mb-4'>
        <Label className='block text-gray-700 font-bold mb-2'>Listing Name</Label>
        <Input
          type='text'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='eg. Beautiful Apartment In Miami'
          {...register('name')}
        />
        {errors.name && <p className='text-red-500 text-sm italic'>{errors.name.message}</p>}
      </div>
      <div className='mb-4'>
        <Label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'
        >
          Description
        </Label>
        <Textarea
          className='border rounded w-full py-2 px-3 resize-none'
          rows={8}
          placeholder='Add an optional description of your property'
          {...register('description')}
        />
        {errors.description && (
          <p className='text-red-500 text-sm italic'>{errors.description.message}</p>
        )}
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <Label className='block text-gray-700 font-bold mb-2'>Location</Label>
        <Input
          type='text'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Street'
          {...register('location.street')}
        />
        {errors?.location?.street && (
          <p className='text-red-500 text-sm italic'>{errors.location.street.message}</p>
        )}
        <Input
          type='text'
          id='city'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='City'
          {...register('location.city')}
        />
        {errors?.location?.city && (
          <p className='text-red-500 text-sm italic'>{errors.location.city.message}</p>
        )}
        <Input
          type='text'
          id='state'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='State'
          {...register('location.state')}
        />
        {errors?.location?.state && (
          <p className='text-red-500 text-sm italic'>{errors.location.state.message}</p>
        )}
        <Input
          type='text'
          id='zipcode'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Zipcode'
          {...register('location.zipcode')}
        />
        {errors?.location?.zipcode && (
          <p className='text-red-500 text-sm italic'>{errors.location.zipcode.message}</p>
        )}
      </div>

      <div className='mb-4 flex flex-wrap'>
        <div className='w-full sm:w-1/3 pr-2'>
          <Label
            htmlFor='beds'
            className='block text-gray-700 font-bold mb-2'
          >
            Beds
          </Label>
          <Input
            type='number'
            id='beds'
            className='border rounded w-full py-2 px-3'
            {...register('beds')}
          />
          {errors.beds && <p className='text-red-500 text-sm italic'>{errors.beds.message}</p>}
        </div>
        <div className='w-full sm:w-1/3 px-2'>
          <Label
            htmlFor='baths'
            className='block text-gray-700 font-bold mb-2'
          >
            Baths
          </Label>
          <Input
            type='number'
            id='baths'
            className='border rounded w-full py-2 px-3'
            {...register('baths')}
          />
          {errors.baths && <p className='text-red-500 text-sm italic'>{errors.baths.message}</p>}
        </div>
        <div className='w-full sm:w-1/3 pl-2'>
          <Label
            htmlFor='square_feet'
            className='block text-gray-700 font-bold mb-2'
          >
            Square Feet
          </Label>
          <Input
            type='number'
            id='square_feet'
            className='border rounded w-full py-2 px-3'
            {...register('square_feet')}
          />
          {errors.square_feet && (
            <p className='text-red-500 text-sm italic'>{errors.square_feet.message}</p>
          )}
        </div>
      </div>

      <div className='mb-4'>
        <Label className='block text-gray-700 font-bold mb-2'>Amenities</Label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <div>
            <input
              type='checkbox'
              id='amenity_wifi'
              name='amenities'
              value='Wifi'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_wifi'>Wifi</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_kitchen'
              name='amenities'
              value='Full Kitchen'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_kitchen'>Full kitchen</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_washer_dryer'
              name='amenities'
              value='Washer & Dryer'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_washer_dryer'>Washer & Dryer</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_free_parking'
              name='amenities'
              value='Free Parking'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_free_parking'>Free Parking</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_pool'
              name='amenities'
              value='Swimming Pool'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_pool'>Swimming Pool</Label>
          </div>
          <div>
            <input
              id='amenity_hot_tub'
              type='checkbox'
              name='amenities'
              value='Hot Tub'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_hot_tub'>Hot Tub</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_24_7_security'
              name='amenities'
              value='24/7 Security'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_24_7_security'>24/7 Security</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_wheelchair_accessible'
              name='amenities'
              value='Wheelchair Accessible'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_wheelchair_accessible'>Wheelchair Accessible</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_elevator_access'
              name='amenities'
              value='Elevator Access'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_elevator_access'>Elevator Access</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_dishwasher'
              name='amenities'
              value='Dishwasher'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_dishwasher'>Dishwasher</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_gym_fitness_center'
              name='amenities'
              value='Gym/Fitness Center'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_gym_fitness_center'>Gym/Fitness Center</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_air_conditioning'
              name='amenities'
              value='Air Conditioning'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_air_conditioning'>Air Conditioning</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_balcony_patio'
              name='amenities'
              value='Balcony/Patio'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_balcony_patio'>Balcony/Patio</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_smart_tv'
              name='amenities'
              value='Smart TV'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_smart_tv'>Smart TV</Label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_coffee_maker'
              name='amenities'
              value='Coffee Maker'
              className='mr-2'
              onChange={(e) => handleCheckboxChange(e)}
            />
            <Label htmlFor='amenity_coffee_maker'>Coffee Maker</Label>
          </div>
          {/* {errors.amenities && (
            <p className='text-red-500 text-sm italic'>{errors.amenities.message}</p>
          )} */}
        </div>
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <Label className='block text-gray-700 font-bold mb-2'>
          Rates (Leave blank if not applicable)
        </Label>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <div className='flex items-center'>
            <Label
              htmlFor='weekly_rate'
              className='mr-2'
            >
              Weekly
            </Label>
            <Input
              type='number'
              min={0}
              id='weekly_rate'
              className='border rounded w-full py-2 px-3'
              {...register('rates.weekly')}
            />
            {errors.rates?.weekly && (
              <p className='text-red-500 text-sm italic'>{errors.rates.weekly.message}</p>
            )}
          </div>
          <div className='flex items-center'>
            <Label
              htmlFor='monthly_rate'
              className='mr-2'
            >
              Monthly
            </Label>
            <Input
              type='number'
              min={0}
              id='monthly_rate'
              className='border rounded w-full py-2 px-3'
              {...register('rates.monthly')}
            />
            {errors.rates?.monthly && (
              <p className='text-red-500 text-sm italic'>{errors.rates.monthly.message}</p>
            )}
          </div>
          <div className='flex items-center'>
            <Label
              htmlFor='nightly_rate'
              className='mr-2'
            >
              Nightly
            </Label>
            <Input
              type='number'
              min={0}
              className='border rounded w-full py-2 px-3'
              {...register('rates.nightly')}
            />
            {errors.rates?.nightly && (
              <p className='text-red-500 text-sm italic'>{errors.rates.nightly.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <Label
          htmlFor='seller_name'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Name
        </Label>
        <Input
          type='text'
          id='seller_name'
          className='border rounded w-full py-2 px-3'
          placeholder='Name'
          {...register('seller_info.name')}
        />
        {errors.seller_info?.name && (
          <p className='text-red-500 text-sm italic'>{errors.seller_info.name.message}</p>
        )}
      </div>
      <div className='mb-4'>
        <Label
          htmlFor='seller_email'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Email
        </Label>
        <Input
          type='email'
          id='seller_email'
          className='border rounded w-full py-2 px-3'
          placeholder='Email address'
          {...register('seller_info.email')}
        />
        {errors.seller_info?.email && (
          <p className='text-red-500 text-sm italic'>{errors.seller_info.email.message}</p>
        )}
      </div>
      <div className='mb-4'>
        <Label
          htmlFor='seller_phone'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Phone
        </Label>
        <Input
          type='tel'
          id='seller_phone'
          className='border rounded w-full py-2 px-3'
          placeholder='Phone'
          {...register('seller_info.phone')}
        />
        {errors.seller_info?.phone && (
          <p className='text-red-500 text-sm italic'>{errors.seller_info.phone.message}</p>
        )}
      </div>

      <div className='mb-4'>
        <Label
          htmlFor='images'
          className='block text-gray-700 font-bold mb-2'
        >
          Images (Select up to 4 images)
        </Label>

        <CloudinaryUploadWidget setImageIds={setImageIds} />
      </div>

      <div>
        <button
          disabled={isSubmitting}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Add Property
        </button>
      </div>
    </form>
  );
}
