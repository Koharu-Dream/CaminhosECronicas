import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { loadJson, saveJson } from "../storage/local";

// Persistência da viagem de cada campanha.
// Sempre grava no aparelho; se houver Supabase, também envia para a nuvem.
// Ao carregar, vence a versão mais recente (campo updatedAt).

const keyFor = (campaignId) => `cec:journey:${campaignId}`;

function isValid(journey) {
  return (
    journey &&
    typeof journey === "object" &&
    Array.isArray(journey.log) &&
    typeof journey.updatedAt === "number"
  );
}

async function pushRemote(campaignId, journey) {
  try {
    const { error } = await supabase.from("journeys").upsert({
      campaign_id: campaignId,
      data: journey,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
  } catch (error) {
    console.warn("Não foi possível sincronizar a viagem:", error);
  }
}

export async function loadJourney(campaignId) {
  const stored = await loadJson(keyFor(campaignId), null);
  const local = isValid(stored) ? stored : null;

  if (!isSupabaseConfigured) return local;

  try {
    const { data, error } = await supabase
      .from("journeys")
      .select("data")
      .eq("campaign_id", campaignId)
      .maybeSingle();
    if (error) throw error;

    const remote = isValid(data?.data) ? data.data : null;

    if (remote && (!local || remote.updatedAt >= local.updatedAt)) {
      await saveJson(keyFor(campaignId), remote);
      return remote;
    }
    if (local) {
      // A cópia do aparelho é mais nova (ou a nuvem está vazia): envia.
      pushRemote(campaignId, local);
    }
    return local;
  } catch (error) {
    console.warn("Sem acesso ao Supabase, usando a viagem do aparelho:", error);
    return local;
  }
}

export async function saveJourney(campaignId, journey) {
  await saveJson(keyFor(campaignId), journey);
  if (isSupabaseConfigured) {
    await pushRemote(campaignId, journey);
  }
}
