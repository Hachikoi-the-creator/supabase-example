import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zeigbouzopuhpdcinrli.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
