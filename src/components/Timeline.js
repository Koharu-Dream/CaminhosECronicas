import styles from "./Timeline.module.css";

export default function Timeline({ entries }) {
  return (
    <section className={styles.timeline}>
      <h2 className={styles.title}>Histórico da viagem</h2>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.id} className={styles.item}>
            <span className={styles.day}>Dia {entry.day}</span>
            <span>{entry.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}