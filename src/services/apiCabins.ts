import { Tables } from "../../types/supabase";
import { supabase } from "./supabase";

export type Cabin = Tables<"cabins">


const getCabins = async () => {
  let response  = await supabase.from('cabins').select('*');

  return response;
};

export { getCabins };
