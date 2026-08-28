import { createClient } from "@supabase/supabase-js";

// Set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY in .env (see .env.example)
// to enable both features that use this client:
//   1. GateOverlay's email form inserts into a "signups" table (public,
//      insert-only — see the setup instructions given alongside this
//      change for the exact SQL to run in Supabase).
//   2. GateOverlay's owner login form uses Supabase Auth
//      (signInWithPassword) to unlock the site — create yourself a user
//      under Authentication -> Users in the Supabase dashboard.
//
// The anon key is safe to expose in frontend code — it's the public key
// Supabase is designed to be used with client-side, and access is
// controlled by Row Level Security policies on the table, not by keeping
// this key secret (same trust model as Stripe's publishable key).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Only construct a real client when configured, so the app doesn't throw at
// import time before the owner has set up their project — GateOverlay
// checks `isSupabaseConfigured` before calling anything on this.
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
