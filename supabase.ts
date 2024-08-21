import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient }  from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://ktuehjurnxdfdfflbzkx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dWVoanVybnhkZmRmZmxiemt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NjY0MzgsImV4cCI6MjAzNjM0MjQzOH0.B2roT1kkqmwMVzcqhkLGEQ4PHtahfUmg-j6ZE0BvQjY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
   auth: {
       storage: AsyncStorage,
       autoRefreshToken: true,
       persistSession: true,
       detectSessionInUrl: true,
   },
});