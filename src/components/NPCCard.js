import Card from "./Card";
import styles from "./NPCCard.module.css";

export default function NPCCard({
  name,
  race,
  occupation,
  location,
  personality,
  notes,
  onRemove,
}) {
  return (
    <Card title={name} tag={race}>
      <p className={styles.role}>
        {occupation} · {location}
      </p>
      {personality && <p className={styles.text}>{personality}</p>}
      {notes && <small className={styles.notes}>{notes}</small>}
      {onRemove && (
        <button className={styles.remove} onClick={onRemove}>
          Remover
        </button>
      )}
    </Card>
  );
}