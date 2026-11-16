import Button from "./Button";
import Card from "./Card";
import { Body, Small } from "./Typography";

export default function CampaignCard({
  name,
  description,
  day,
  currentLocation,
  onOpen,
}) {
  return (
    <Card title={name} tag={`Dia ${day}`}>
      <Body>{description}</Body>
      <Small>Local atual: {currentLocation}</Small>
      <Button title="Abrir campanha →" onPress={onOpen} />
    </Card>
  );
}
