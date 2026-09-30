import BackButton from "../components/BackButton";
import EventCard from "../components/EventCard";
import events from "../data/events.json";

export default function Events() {
  return (
    <main className="container">
      <BackButton href="/" />
      <h1>Eventos</h1>

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