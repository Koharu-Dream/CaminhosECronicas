import CardList from "../../src/components/CardList";
import EventCard from "../../src/components/EventCard";
import EventGenerator from "../../src/components/EventGenerator";
import Screen, { tabEdges } from "../../src/components/Screen";
import { Subtitle, Title } from "../../src/components/Typography";
import events from "../../src/data/events.json";

export default function Events() {
  return (
    <Screen edges={tabEdges}>
      <Title>Eventos</Title>

      <EventGenerator />

      <Subtitle>Todos os eventos</Subtitle>
      <CardList>
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
      </CardList>
    </Screen>
  );
}
