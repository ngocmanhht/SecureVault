import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AUTH_STORAGE_KEY } from '.';
import 'react-native-url-polyfill/auto';
export const supabase = createClient(
  'https://tnlokhykwfnqtcvyeqko.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubG9raHlrd2ZucXRjdnllcWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwMDU1MzAsImV4cCI6MjAyNDU4MTUzMH0.vP7z4J-wq-XJ2phywaNJkuJgQ6zkhwTWEhll8Y0YT1c',
  {
    auth: {
      detectSessionInUrl: false,
      storage: AsyncStorage,
      storageKey: AUTH_STORAGE_KEY,
      autoRefreshToken: true,
    },
  },
);
