import { supabase } from "./supabase";

// Serviço dos avisos (tabela `notifications` do Supabase).
//
// Em vez de um celular chamar o outro, o Mestre apenas SALVA o aviso no banco
// (insert). O Supabase Realtime, que "escuta" a tabela por WebSocket, avisa
// todos os aparelhos conectados assim que a linha é inserida.

const TABLE = "notifications";

// Histórico: os avisos mais recentes primeiro.
export async function fetchNotifications(limit = 30) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

// Ação do Mestre: grava o aviso. O resto é por conta do Realtime.
export async function sendNotification(title, body) {
  const { error } = await supabase
    .from(TABLE)
    .insert([{ title: title.trim(), body: body.trim() }]);
  if (error) throw error;
}

// Liga o "radar": chama onInsert(linha) a cada INSERT na tabela.
// onStatus recebe SUBSCRIBED, CHANNEL_ERROR, TIMED_OUT ou CLOSED.
// Devolve a função que desliga a escuta.
export function subscribeToNotifications(onInsert, onStatus) {
  // Nome único: evita conflito com um canal antigo ainda sendo fechado
  // (acontece com o recarregamento automático em desenvolvimento).
  const name = `avisos-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const channel = supabase
    .channel(name)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: TABLE },
      (payload) => onInsert(payload.new)
    )
    .subscribe((status) => {
      if (onStatus) onStatus(status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}
