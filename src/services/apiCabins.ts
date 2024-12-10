import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "../../types/supabase";
import { supabase } from "./supabase";

export type Cabin = Tables<"cabins">
export type Error = PostgrestError | null

type GetCabinsResponse = {
  cabins: Cabin[];
  error: Error;
};


const getCabins = async () => {
  let {data: cabins , error }  = await supabase.from('cabins').select('*');

  return { cabins, error } as GetCabinsResponse;
};

export { getCabins };
