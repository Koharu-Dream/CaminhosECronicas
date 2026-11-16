import { useRouter } from "expo-router";
import CampaignCard from "../../src/components/CampaignCard";
import CardList from "../../src/components/CardList";
import Screen, { tabEdges } from "../../src/components/Screen";
import { Body, Title } from "../../src/components/Typography";
import { useJourney } from "../../src/context/JourneyContext";
import campaigns from "../../src/data/campaigns.json";
import { mergeCampaign } from "../../src/utils/campaign";

export default function Campaigns() {
  const router = useRouter();
  const { getJourney } = useJourney();

  return (
    <Screen edges={tabEdges}>
      <Title>Campanhas</Title>
      <Body>Escolha uma campanha para abrir o painel do Mestre.</Body>

      <CardList>
        {campaigns.map((base) => {
          const campaign = mergeCampaign(base, getJourney(base.id));
          return (
            <CampaignCard
              key={campaign.id}
              name={campaign.name}
              description={campaign.description}
              day={campaign.day}
              currentLocation={campaign.currentLocation}
              onOpen={() => router.push(`/campaign/${campaign.id}`)}
            />
          );
        })}
      </CardList>
    </Screen>
  );
}
