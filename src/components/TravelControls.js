import { useState } from "react";
import SelectField from "./SelectField";
import options from "../data/travel.json";
import styles from "./TravelControls.module.css";

const paces = options.paces.map((item) => item.name);
const terrains = options.terrains.map((item) => item.name);

export default function TravelControls({ trip, onChange, onAdvance, onReset }) {
  const [reason, setReason] = useState("");

  function change(field, label, value) {
    onChange(field, label, value, reason.trim());
    setReason("");
  }

  const arrived = trip.remaining === 0;

  return (
    <section className={styles.controls}>
      <h2 className={styles.title}>Controles da viagem</h2>

      <div className={styles.row}>
        <SelectField
          label="Ritmo"
          value={trip.pace}
          options={paces}
          onChange={(value) => change("pace", "Ritmo", value)}
        />
        <SelectField
          label="Terreno"
          value={trip.terrain}
          options={terrains}
          onChange={(value) => change("terrain", "Terreno", value)}
        />
        <SelectField
          label="Clima"
          value={trip.weather}
          options={options.weathers}
          onChange={(value) => change("weather", "Clima", value)}
        />
      </div>

      <label className={styles.reason}>
        <span>Motivo da mudança (opcional, escreva antes de trocar)</span>
        <input
          className={styles.input}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Ex.: o grupo decidiu pegar uma trilha alternativa"
        />
      </label>

      <div className={styles.actions}>
        <button
          className={styles.advance}
          onClick={onAdvance}
          disabled={arrived}
        >
          Avançar 1 dia
        </button>
        <button className={styles.reset} onClick={onReset}>
          Nova viagem
        </button>
      </div>
    </section>
  );
}