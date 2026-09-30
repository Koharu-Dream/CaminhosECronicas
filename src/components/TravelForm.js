import { useState } from "react";
import SelectField from "./SelectField";
import options from "../data/travel.json";
import styles from "./TravelForm.module.css";

const paces = options.paces.map((item) => item.name);
const terrains = options.terrains.map((item) => item.name);

const emptyForm = {
  origin: "",
  destination: "",
  distance: "",
  partySize: "4",
  pace: "Normal",
  terrain: "Estrada",
};

export default function TravelForm({ onCreate }) {
  const [form, setForm] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onCreate(form);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Nova viagem</h2>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Origem *</span>
          <input
            className={styles.input}
            name="origin"
            value={form.origin}
            onChange={handleChange}
            placeholder="Neverwinter"
            required
          />
        </label>
        <label className={styles.field}>
          <span>Destino *</span>
          <input
            className={styles.input}
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="Waterdeep"
            required
          />
        </label>
        <label className={styles.field}>
          <span>Distância (km) *</span>
          <input
            className={styles.input}
            type="number"
            min="1"
            name="distance"
            value={form.distance}
            onChange={handleChange}
            placeholder="200"
            required
          />
        </label>
        <label className={styles.field}>
          <span>Personagens *</span>
          <input
            className={styles.input}
            type="number"
            min="1"
            name="partySize"
            value={form.partySize}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className={styles.fields}>
        <SelectField
          label="Ritmo"
          value={form.pace}
          options={paces}
          onChange={(value) => setForm({ ...form, pace: value })}
        />
        <SelectField
          label="Terreno"
          value={form.terrain}
          options={terrains}
          onChange={(value) => setForm({ ...form, terrain: value })}
        />
      </div>

      <button type="submit" className={styles.submit}>
        Iniciar viagem
      </button>
    </form>
  );
}