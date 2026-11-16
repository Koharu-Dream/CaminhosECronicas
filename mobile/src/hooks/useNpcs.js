import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { addNpc, listNpcs, removeNpc } from "../services/npcService";

// status: "loading" | "cloud" | "offline" | "local"
export default function useNpcs() {
  const [npcs, setNpcs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const result = await listNpcs();
    setNpcs(result.npcs);
    setStatus(result.source);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError("");
    await load();
    setRefreshing(false);
  }, [load]);

  const add = useCallback(async (data) => {
    setError("");
    const result = await addNpc(data);
    setNpcs((previous) => [...previous, result.npc]);
    if (isSupabaseConfigured && !result.synced) {
      setStatus("offline");
    }
  }, []);

  const remove = useCallback(async (id) => {
    setError("");
    try {
      await removeNpc(id);
      setNpcs((previous) => previous.filter((npc) => npc.id !== id));
    } catch (err) {
      console.warn("Falha ao remover NPC:", err);
      setError("Não foi possível remover o NPC agora. Verifique a conexão.");
    }
  }, []);

  return { npcs, status, error, refreshing, add, remove, refresh };
}
