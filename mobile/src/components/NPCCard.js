import Button from "./Button";
import Card from "./Card";
import { Body, Small } from "./Typography";

export default function NPCCard({
  name,
  race,
  occupation,
  location,
  personality,
  notes,
  pending,
  onRemove,
}) {
  return (
    <Card title={name} tag={race}>
      <Body>
        {occupation} · {location}
      </Body>
      {personality ? <Body>{personality}</Body> : null}
      {notes ? <Small>{notes}</Small> : null}
      {pending ? <Small>📱 Salvo só no aparelho (sobe para a nuvem depois)</Small> : null}
      {onRemove ? (
        <Button title="Remover" variant="danger" onPress={onRemove} />
      ) : null}
    </Card>
  );
}
