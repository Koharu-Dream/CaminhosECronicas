import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import BackButton from "../../src/components/BackButton";
import Button from "../../src/components/Button";
import Screen from "../../src/components/Screen";
import StatList from "../../src/components/StatList";
import { Body, Small, Subtitle, Title } from "../../src/components/Typography";
import { useJourney } from "../../src/context/JourneyContext";
import campaigns from "../../src/data/campaigns.json";
import { mergeCampaign } from "../../src/utils/campaign";

export default function CampaignDashboard() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const campaignId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { getJourney } = useJourney();

  const base = campaigns.find((item) => item.id === campaignId);

  if (!base) {
    return (
      <Screen>
        <BackButton fallback="/campaigns" label="← Campanhas" />
        <Title>Campanha não encontrada</Title>
      </Screen>
    );
  }

  const campaign = mergeCampaign(base, getJourney(base.id));

  const stats = [
    { label: "Local atual", value: campaign.currentLocation },
    { label: "Dia", value: campaign.day },
    { label: "Hora", value: campaign.time },
    { label: "Clima", value: campaign.weather },
    { label: "Viagem", value: `${campaign.kmRemaining} km restantes` },
  ];

  return (
    <Screen>
      <BackButton fallback="/campaigns" label="← Campanhas" />
      <Title>{campaign.name}</Title>
      <Body>{campaign.description}</Body>
      <Small>Criada em {campaign.createdAt}</Small>

      <StatList stats={stats} />

      <Subtitle>Ferramentas</Subtitle>
      <View style={styles.actions}>
        <Button
          title="🧭 Viagem"
          onPress={() => router.push(`/travel/${campaign.id}`)}
        />
        <Button
          title="🎲 Gerar evento"
          onPress={() => router.navigate("/events")}
        />
        <Button title="NPCs" onPress={() => router.navigate("/npcs")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12,
    marginTop: 12,
  },
});
