import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Caminhos e Crônicas
      </Link>
      <nav className={styles.nav}>
        <Link href="/">Início</Link>
        <Link href="/campaigns">Campanhas</Link>
        <Link href="/events">Eventos</Link>
        <Link href="/npcs">NPCs</Link>
      </nav>
    </header>
  );
}