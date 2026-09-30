import Card from "./Card";

export default function EventCard({
  title,
  category,
  environment,
  difficulty,
  description,
}) {
  return (
    <Card title={title} tag={category}>
      <p>{description}</p>
      <small>
        {environment} · {difficulty}
      </small>
    </Card>
  );
}