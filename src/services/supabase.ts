import { createClient } from '@supabase/supabase-js';
import { type Database } from '../../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_BASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export { supabase, supabaseUrl };

