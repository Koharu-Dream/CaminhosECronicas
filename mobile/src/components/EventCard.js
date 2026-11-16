import Card from "./Card";
import { Body, Small } from "./Typography";

export default function EventCard({
  title,
  category,
  environment,
  difficulty,
  description,
}) {
  return (
    <Card title={title} tag={category}>
      <Body>{description}</Body>
      <Small>
        {environment} · {difficulty}
      </Small>
    </Card>
  );
}
