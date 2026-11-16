// Ponto de entrada da conexão com o Supabase (src/services/supabase.js, como no
// material MOBILE_009). O cliente é criado em src/lib/supabase.js, a partir das
// variáveis do arquivo .env, e todos os serviços do app usam esse mesmo cliente.
export { isSupabaseConfigured, supabase } from "../lib/supabase";
