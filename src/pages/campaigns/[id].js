import Link from "next/link";
import { useRouter } from "next/router";
import BackButton from "../../components/BackButton";
import StatItem from "../../components/StatItem";
import campaigns from "../../data/campaigns.json";

export default function CampaignDashboard() {
  const router = useRouter();

  if (!router.isReady) {
    return (
      <main className="container">
        <p>Carregando...</p>
      </main>
    );
  }

  const campaign = campaigns.find((item) => item.id === router.query.id);

  if (!campaign) {
    return (
      <main className="container">
        <BackButton href="/campaigns" label="← Campanhas" />
        <h1>Campanha não encontrada</h1>
      </main>
    );
  }

  const stats = [
    { label: "Local atual", value: campaign.currentLocation },
    { label: "Dia", value: campaign.day },
    { label: "Hora", value: campaign.time },
    { label: "Clima", value: campaign.weather },
    { label: "Viagem", value: `${campaign.kmRemaining} km restantes` },
  ];

  return (
    <main className="container">
      <BackButton href="/campaigns" label="← Campanhas" />
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>
      <small>Criada em {campaign.createdAt}</small>

      <section className="statList">
        {stats.map((stat) => (
          <StatItem key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <h2>Ferramentas</h2>
      <div className="actions">
        <Link href="/events" className="button">
          🎲 Gerar evento
        </Link>
        <Link href="/npcs" className="button">
          NPCs
        </Link>
      </div>
    </main>
  );
}