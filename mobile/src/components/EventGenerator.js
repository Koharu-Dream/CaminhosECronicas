import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import events from "../data/events.json";
import { colors } from "../theme";
import Button from "./Button";
import ChipSelect, { ALL } from "./ChipSelect";
import EventCard from "./EventCard";
import { Small, Subtitle } from "./Typography";

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

  // Trocar um filtro zera o sorteio atual e o histórico de tentativas.
  function changeFilter(setter) {
    return (value) => {
      setter(value);
      clearResults();
    };
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
    <View style={styles.generator}>
      <Subtitle style={styles.title}>Gerador de eventos</Subtitle>

      <ChipSelect
        label="Ambiente"
        value={environment}
        options={environments}
        includeAll
        onChange={changeFilter(setEnvironment)}
      />
      <ChipSelect
        label="Categoria"
        value={category}
        options={categories}
        includeAll
        onChange={changeFilter(setCategory)}
      />
      <ChipSelect
        label="Dificuldade"
        value={difficulty}
        options={difficulties}
        includeAll
        onChange={changeFilter(setDifficulty)}
      />

      <Small>{filtered.length} evento(s) compatível(is) com os filtros</Small>

      <View style={styles.actions}>
        <Button
          title={current ? "🎲 Rolar novamente" : "🎲 Gerar evento"}
          onPress={handleRoll}
          disabled={filtered.length === 0}
        />
        <Button title="Limpar" variant="secondary" onPress={handleReset} />
      </View>

      {current && (
        <View style={styles.result}>
          <Small>Tentativa {history.length + 1}</Small>
          <EventCard
            title={current.title}
            category={current.category}
            environment={current.environment}
            difficulty={current.difficulty}
            description={current.description}
          />
        </View>
      )}

      {history.length > 0 && (
        <View style={styles.result}>
          <Text style={styles.historyTitle}>Tentativas anteriores</Text>
          {history.map((event, index) => (
            <Text key={index} style={styles.historyItem}>
              {index + 1}. {event.title} (rerolado)
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  generator: {
    gap: 14,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surfaceDark,
  },
  title: {
    marginTop: 0,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  result: {
    gap: 6,
  },
  historyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  historyItem: {
    color: colors.textMuted,
    fontSize: 15,
  },
});
