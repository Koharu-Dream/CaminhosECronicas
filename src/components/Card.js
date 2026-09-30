import styles from "./Card.module.css";

export default function Card({ title, tag, children }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {tag && <span className={styles.tag}>{tag}</span>}
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}