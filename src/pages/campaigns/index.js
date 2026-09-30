import BackButton from "../../components/BackButton";
import CampaignCard from "../../components/CampaignCard";
import campaigns from "../../data/campaigns.json";

export default function Campaigns() {
  return (
    <main className="container">
      <BackButton href="/" />
      <h1>Campanhas</h1>
      <p>Escolha uma campanha para abrir o painel do Mestre.</p>

      <section className="cardList">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            description={campaign.description}
            day={campaign.day}
            currentLocation={campaign.currentLocation}
          />
        ))}
      </section>
    </main>
  );
}