import { Tables } from '../../types/supabase';
import { CabinForm } from '../features/cabins/CreateCabinForm';
import { supabase } from './supabase';

interface StorageDataResponse {
  path: string;
  fullPath: string;
}

const getCabins = async () => {
  const response = await supabase.from('cabins').select('*');

  if (response.error) {
    throw new Error('Cabins could not be loaded');
  }

  return response;
};

const deleteCabin = async (id: string) => {
  const response = await supabase.from('cabins').delete().eq('id', id);

  if (response.error) {
    throw new Error('Cabin could not be deleted');
  }

  return response;
};

/**
 * Adds a new cabin to the database.
 * @param cabin The cabin object to add.
 * @returns The response from the database.
 */
const addCabin = async (cabin: CabinForm) => {
  const storageUrl =
    'https://gehtyocsqvjzidaosexh.supabase.co/storage/v1/object/public/';

  if (cabin.image.length === 0) {
    throw new Error('You must upload at least one image');
  }

  // First image name
  const fileName = cabin.image[0].name;
  const { data, error } = await supabase.storage
    .from('cabin-images')
    .upload(fileName, cabin.image[0], {
      upsert: false,
      cacheControl: '3600',
    });

  if (error) {
    throw new Error(error.message);
  }

  // create full path to image
  const fullPath = `${storageUrl}${data.fullPath}`;

  // 2. Create the new cabin
  const newCabin: Tables<'cabins'> = {
    ...cabin,
    image: fullPath,
  };

  // 2. Add the cabin
  const response = await supabase.from('cabins').insert(newCabin);

  if (response.error) {
    throw new Error('Cabin could not be created');
  }

  return response;
};

// TODO add multiple cabins
// const addCabins = async (cabins: Cabin[]) => {
//   let response = await supabase.from('cabins').insert(cabins);
//   return response;
// }

export { addCabin, deleteCabin, getCabins };
