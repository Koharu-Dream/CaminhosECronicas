import styles from "./StatItem.module.css";

export default function StatItem({ label, value }) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}