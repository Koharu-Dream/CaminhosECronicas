import Link from "next/link";
import styles from "./BackButton.module.css";

export default function BackButton({ href = "/", label = "← Voltar" }) {
  return (
    <Link href={href} className={styles.back}>
      {label}
    </Link>
  );
}