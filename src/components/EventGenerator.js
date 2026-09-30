import { useState } from "react";
import EventCard from "./EventCard";
import events from "../data/events.json";
import styles from "./EventGenerator.module.css";

function pickRandom(list, exclude) {
  const options = exclude
    ? list.filter((event) => event.id !== exclude.id)
    : list;
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

export default function EventGenerator() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);

  function handleRoll() {
    if (current) {
      setHistory([...history, current]);
    }
    setCurrent(pickRandom(events, current));
  }

  function handleReset() {
    setCurrent(null);
    setHistory([]);
  }

  return (
    <section className={styles.generator}>
      <h2 className={styles.title}>Gerador de eventos</h2>

      <div className={styles.actions}>
        <button className={styles.button} onClick={handleRoll}>
          {current ? "🎲 Rolar novamente" : "🎲 Gerar evento"}
        </button>
        {current && (
          <button className={styles.secondary} onClick={handleReset}>
            Limpar
          </button>
        )}
      </div>

      {current && (
        <div>
          <p className={styles.attempt}>Tentativa {history.length + 1}</p>
          <EventCard
            title={current.title}
            category={current.category}
            environment={current.environment}
            difficulty={current.difficulty}
            description={current.description}
          />
        </div>
      )}

      {history.length > 0 && (
        <div>
          <h3 className={styles.subtitle}>Tentativas anteriores</h3>
          <ol className={styles.history}>
            {history.map((event, index) => (
              <li key={index}>{event.title} (rerolado)</li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}