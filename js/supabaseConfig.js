import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Biarkan URL dan ANON KEY asli milik Anda di sini
const supabaseUrl = 'https://ruolefhcibqbdiugnucv.supabase.co'; 
const supabaseKey = 'sb_publishable_AEET_6iJGG4LhStsc7NmhA_nmLVw1-z';

// INI KODE TAMBAHANNYA: Kita paksa Supabase memakai LocalStorage
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: window.localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});