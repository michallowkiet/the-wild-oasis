import { Tables } from "../../types/supabase";
import { supabase } from "./supabase";

// interface Cabin extends Tables<"cabins">


const getCabins = async () => {
  const response  = await supabase.from('cabins').select('*');

  if (response.error) {
    throw new Error("Cabins could not be loaded");
  }

  return response;
};

const deleteCabin = async (id: string) => {
  const response = await supabase.from('cabins').delete().eq('id', id);

  if (response.error) {
    throw new Error("Cabin could not be deleted");
  }

  return response;
}

/**
 * Adds a new cabin to the database.
 * @param cabin The cabin object to add.
 * @returns The response from the database.
 */
const addCabin = async (cabin: Tables<"cabins">) => {
    const response = await supabase.from('cabins').insert(cabin);

    if (response.error) {
      throw new Error("Cabin could not be created");
    }

    return response;
  
}

// TODO add multiple cabins
// const addCabins = async (cabins: Cabin[]) => {
//   let response = await supabase.from('cabins').insert(cabins);
//   return response;
// }

export { addCabin, deleteCabin, getCabins };

