import Link from "next/link";
import Card from "./Card";
import styles from "./CampaignCard.module.css";

export default function CampaignCard({
  id,
  name,
  description,
  day,
  currentLocation,
}) {
  return (
    <Card title={name} tag={`Dia ${day}`}>
      <p className={styles.text}>{description}</p>
      <small className={styles.location}>Local atual: {currentLocation}</small>
      <Link href={`/campaigns/${id}`} className={styles.open}>
        Abrir campanha →
      </Link>
    </Card>
  );
}