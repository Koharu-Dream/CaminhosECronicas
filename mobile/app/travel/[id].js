import { useLocalSearchParams } from "expo-router";
import BackButton from "../../src/components/BackButton";
import Screen from "../../src/components/Screen";
import Timeline from "../../src/components/Timeline";
import TravelControls from "../../src/components/TravelControls";
import TravelForm from "../../src/components/TravelForm";
import TravelStatus from "../../src/components/TravelStatus";
import { Body, Subtitle, Title } from "../../src/components/Typography";
import { useJourney } from "../../src/context/JourneyContext";
import campaigns from "../../src/data/campaigns.json";

export default function Travel() {
  const params = useLocalSearchParams();
  const campaignId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { ready, getJourney, createTrip, changeCondition, advanceDay, resetTrip } =
    useJourney();

  const campaign = campaigns.find((item) => item.id === campaignId);
  const backTo = `/campaign/${campaignId}`;

  if (!campaign) {
    return (
      <Screen>
        <BackButton fallback="/campaigns" label="← Campanhas" />
        <Title>Campanha não encontrada</Title>
      </Screen>
    );
  }

  if (!ready) {
    return (
      <Screen>
        <BackButton fallback={backTo} label="← Campanha" />
        <Body>Carregando viagem...</Body>
      </Screen>
    );
  }

  const { trip, log } = getJourney(campaign.id);

  return (
    <Screen>
      <BackButton fallback={backTo} label="← Campanha" />
      <Title>Viagem</Title>
      <Body>{campaign.name}</Body>

      {!trip && (
        <TravelForm onCreate={(form) => createTrip(campaign.id, form)} />
      )}

      {trip && (
        <>
          <Subtitle>
            {trip.origin} → {trip.destination}
          </Subtitle>
          <TravelStatus trip={trip} />
          <TravelControls
            trip={trip}
            onChange={(field, label, value, reason) =>
              changeCondition(campaign.id, field, label, value, reason)
            }
            onAdvance={() => advanceDay(campaign.id)}
            onReset={() => resetTrip(campaign.id)}
          />
          <Timeline entries={log} />
        </>
      )}
    </Screen>
  );
}
