import { useState } from "react";
import EventCard from "./EventCard";
import FilterSelect from "./FilterSelect";
import events from "../data/events.json";
import styles from "./EventGenerator.module.css";

const ALL = "Todos";

const environments = [...new Set(events.map((event) => event.environment))];
const categories = [...new Set(events.map((event) => event.category))];
const difficulties = [...new Set(events.map((event) => event.difficulty))];

function pickRandom(list, exclude) {
  const options = exclude
    ? list.filter((event) => event.id !== exclude.id)
    : list;
  const pool = options.length > 0 ? options : list;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export default function EventGenerator() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [environment, setEnvironment] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [difficulty, setDifficulty] = useState(ALL);

  const filtered = events.filter(
    (event) =>
      (environment === ALL || event.environment === environment) &&
      (category === ALL || event.category === category) &&
      (difficulty === ALL || event.difficulty === difficulty)
  );

  function clearResults() {
    setCurrent(null);
    setHistory([]);
  }

  function handleRoll() {
    if (filtered.length === 0) return;
    if (current) {
      setHistory([...history, current]);
    }
    setCurrent(pickRandom(filtered, current));
  }

  function handleReset() {
    clearResults();
    setEnvironment(ALL);
    setCategory(ALL);
    setDifficulty(ALL);
  }

  return (
    <section className={styles.generator}>
      <h2 className={styles.title}>Gerador de eventos</h2>

      <div className={styles.filters}>
        <FilterSelect
          label="Ambiente"
          value={environment}
          options={environments}
          onChange={(value) => {
            setEnvironment(value);
            clearResults();
          }}
        />
        <FilterSelect
          label="Categoria"
          value={category}
          options={categories}
          onChange={(value) => {
            setCategory(value);
            clearResults();
          }}
        />
        <FilterSelect
          label="Dificuldade"
          value={difficulty}
          options={difficulties}
          onChange={(value) => {
            setDifficulty(value);
            clearResults();
          }}
        />
      </div>

      <p className={styles.count}>
        {filtered.length} evento(s) compatível(is) com os filtros
      </p>

      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={handleRoll}
          disabled={filtered.length === 0}
        >
          {current ? "🎲 Rolar novamente" : "🎲 Gerar evento"}
        </button>
        <button className={styles.secondary} onClick={handleReset}>
          Limpar
        </button>
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