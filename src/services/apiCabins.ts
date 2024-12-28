import { Tables, TablesUpdate } from '../../types/supabase';
import { CabinForm } from '../features/cabins/CreateCabinForm';
import { supabase } from './supabase';

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

/**
 * Adds an image to the Supabase Storage.
 * @param file The file to be uploaded.
 * @returns The URL of the uploaded image.
 * @throws {Error} If the upload fails.
 */
const addImageToStorage = async (file: File) => {
  // First image name
  const fileName = file.name;
  const { data, error } = await supabase.storage
    .from('cabin-images')
    .upload(fileName, file, {
      upsert: false,
      cacheControl: '3600',
    });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Image could not be uploaded');
  }

  const { fullPath } = data;

  return `${STORAGE_URL}${fullPath}`;
};

/**
 * Adds a new cabin to the database.
 * @param cabin The cabin object to add.
 * @returns The response from the database.
 */
const addCabin = async (cabin: CabinForm) => {
  if (typeof cabin.image[0] === 'object' && !cabin.image[0].name) {
    throw new Error('You must upload at least one image');
  }

  // 1. Upload the cabin image to storage and return the full path
  const imageFullPath = await addImageToStorage(cabin.image[0]);

  // 2. Create the new cabin
  const newCabin: Tables<'cabins'> = {
    ...cabin,
    image: imageFullPath,
  };

  // 2. Add the cabin
  const response = await supabase.from('cabins').insert(newCabin);

  if (response.error) {
    throw new Error('Cabin could not be created');
  }

  return response;
};

const editCabin = async (cabin: TablesUpdate<'cabins'>) => {
  let imageFullPath = '';

  if (
    cabin.image &&
    typeof cabin.image[0] === 'object' &&
    'name' in cabin.image[0]
  ) {
    imageFullPath = await addImageToStorage(cabin.image[0]);
    cabin.image = imageFullPath;
  } else {
    delete cabin.image;
  }

  const response = await supabase
    .from('cabins')
    .update(cabin)
    .eq('id', cabin.id!);

  if (response.error) {
    throw new Error('Cabin could not be updated');
  }

  return response;
};

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

// TODO add multiple cabins
// const addCabins = async (cabins: Cabin[]) => {
//   let response = await supabase.from('cabins').insert(cabins);
//   return response;
// }

export { addCabin, deleteCabin, editCabin, getCabins };
