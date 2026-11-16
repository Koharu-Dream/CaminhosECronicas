import seed from "../data/npcs.json";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { loadJson, saveJson } from "../storage/local";

// Camada de armazenamento dos NPCs.
//  - Com Supabase configurado: a nuvem é a fonte da verdade e o AsyncStorage
//    guarda uma cópia (cache) para funcionar sem internet.
//  - Sem Supabase (ou sem conexão): tudo fica no aparelho. NPCs criados assim
//    recebem `pending: true` e sobem para a nuvem na próxima sincronização.

const KEY = "cec:npcs";
const FIELDS = ["name", "race", "occupation", "location", "personality", "notes"];

function toPayload(data) {
  const payload = {};
  FIELDS.forEach((field) => {
    payload[field] = (data[field] ?? "").trim();
  });
  return payload;
}

async function insertRemote(item) {
  const { id, pending, ...payload } = item;
  const { error } = await supabase.from("npcs").insert(payload);
  if (error) throw error;
}

// source: "cloud" (sincronizado) | "offline" (sem conexão) | "local" (sem Supabase)
export async function listNpcs() {
  const cached = await loadJson(KEY, null);

  if (!isSupabaseConfigured) {
    if (cached) return { npcs: cached, source: "local" };
    await saveJson(KEY, seed);
    return { npcs: seed, source: "local" };
  }

  try {
    let current = cached ?? [];

    // Envia primeiro o que foi criado sem conexão.
    for (const item of current.filter((npc) => npc.pending)) {
      await insertRemote(item);
      current = current.filter((npc) => npc.id !== item.id);
      await saveJson(KEY, current);
    }

    const { data, error } = await supabase
      .from("npcs")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;

    await saveJson(KEY, data);
    return { npcs: data, source: "cloud" };
  } catch (error) {
    console.warn("Sem acesso ao Supabase, usando dados do aparelho:", error);
    return { npcs: cached ?? seed, source: "offline" };
  }
}

export async function addNpc(data) {
  const payload = toPayload(data);

  if (isSupabaseConfigured) {
    try {
      const { data: row, error } = await supabase
        .from("npcs")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;

      const cached = await loadJson(KEY, []);
      await saveJson(KEY, [...cached, row]);
      return { npc: row, synced: true };
    } catch (error) {
      console.warn("Não foi possível salvar na nuvem, salvando no aparelho:", error);
    }
  }

  const npc = { ...payload, id: `local-${Date.now()}`, pending: true };
  const cached = await loadJson(KEY, []);
  await saveJson(KEY, [...cached, npc]);
  return { npc, synced: false };
}

export async function removeNpc(id) {
  const cached = await loadJson(KEY, []);
  const target = cached.find((npc) => npc.id === id);
  const onlyLocal = !target || target.pending || !isSupabaseConfigured;

  if (!onlyLocal) {
    const { error } = await supabase.from("npcs").delete().eq("id", id);
    if (error) throw error;
  }

  await saveJson(
    KEY,
    cached.filter((npc) => npc.id !== id)
  );
}
