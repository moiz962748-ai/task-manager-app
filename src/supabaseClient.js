// supabaseClient.js
// -----------------------------------------------------------------
// Yeh file Supabase se connection banati hai.
// Supabase = Backend-as-a-Service (Database + Auth + API sab ek jagah).
// Hum yahan sirf ek "client" object bana rahe hain jo poori app mein
// database aur authentication calls karne ke liye use hoga.
// -----------------------------------------------------------------

import { createClient } from '@supabase/supabase-js'

// Yeh do values tumhein Supabase Dashboard se milengi:
// Project Settings -> API -> Project URL aur anon public key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// createClient() ek object return karta hai jisme:
// - supabase.auth   -> login/signup/logout ke functions
// - supabase.from()  -> database tables ke saath CRUD operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
