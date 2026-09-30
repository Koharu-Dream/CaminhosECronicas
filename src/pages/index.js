import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Caminhos e Crônicas</h1>
      <p>
        Ferramenta de apoio ao Mestre de D&amp;D 2014: gere eventos, consulte
        NPCs e acompanhe a campanha.
      </p>
      <div className="actions">
  <Link href="/campaigns" className="button">
    Selecionar campanha
  </Link>
  <Link href="/events" className="button">
    Ver eventos
  </Link>
  <Link href="/npcs" className="button">
    Ver NPCs
  </Link>
    </div>
    </main>
  );
}