import EventCard from "../components/EventCard";
import events from "../data/events.json";

export default function Home() {
  return (
    <main className="container">
      <h1>Caminhos e Crônicas</h1>
      <p>Ferramenta de apoio ao Mestre.</p>

      <section className="cardList">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            category={event.category}
            environment={event.environment}
            difficulty={event.difficulty}
            description={event.description}
          />
        ))}
      </section>
    </main>
  );
}