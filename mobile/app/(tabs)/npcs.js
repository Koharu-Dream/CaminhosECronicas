import { RefreshControl, StyleSheet, Text } from "react-native";
import CardList from "../../src/components/CardList";
import NPCCard from "../../src/components/NPCCard";
import NPCForm from "../../src/components/NPCForm";
import Screen, { tabEdges } from "../../src/components/Screen";
import SyncStatus from "../../src/components/SyncStatus";
import { Body, Subtitle, Title } from "../../src/components/Typography";
import useNpcs from "../../src/hooks/useNpcs";
import { isSupabaseConfigured } from "../../src/lib/supabase";
import { colors } from "../../src/theme";

export default function NPCs() {
  const { npcs, status, error, refreshing, add, remove, refresh } = useNpcs();

  return (
    <Screen
      edges={tabEdges}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={colors.primary}
        />
      }
    >
      <Title>NPCs</Title>
      <SyncStatus status={status} />

      <NPCForm onAdd={add} />

      <Subtitle>Lista de NPCs ({npcs.length})</Subtitle>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {npcs.length === 0 && status !== "loading" ? (
        <Body>Nenhum NPC por aqui. Adicione o primeiro!</Body>
      ) : null}

      <CardList>
        {npcs.map((npc) => (
          <NPCCard
            key={npc.id}
            name={npc.name}
            race={npc.race}
            occupation={npc.occupation}
            location={npc.location}
            personality={npc.personality}
            notes={npc.notes}
            pending={isSupabaseConfigured && npc.pending}
            onRemove={() => remove(npc.id)}
          />
        ))}
      </CardList>
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    marginBottom: 8,
    color: colors.danger,
    fontSize: 15,
  },
});
