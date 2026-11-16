import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// As variáveis EXPO_PUBLIC_* são lidas do arquivo .env (veja .env.example).
// A chave usada aqui é a "publishable" (ou "anon") do Supabase, que foi feita
// para ficar no app. NUNCA coloque a chave "service_role" neste projeto.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Sem as variáveis, o app continua funcionando em "modo local" (AsyncStorage).
export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null;
