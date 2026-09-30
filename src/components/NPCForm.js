import { useState } from "react";
import styles from "./NPCForm.module.css";

const fields = [
  { name: "name", label: "Nome", required: true },
  { name: "race", label: "Raça", required: true },
  { name: "occupation", label: "Ocupação", required: true },
  { name: "location", label: "Local", required: true },
  { name: "personality", label: "Personalidade", required: false },
];

const emptyForm = {
  name: "",
  race: "",
  occupation: "",
  location: "",
  personality: "",
};

export default function NPCForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (form.name.trim() === "") return;
    onAdd(form);
    setForm(emptyForm);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Novo NPC</h2>

      <div className={styles.fields}>
        {fields.map((field) => (
          <label key={field.name} className={styles.field}>
            <span>
              {field.label}
              {field.required && " *"}
            </span>
            <input
              className={styles.input}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          </label>
        ))}
      </div>

      <button type="submit" className={styles.submit}>
        + Adicionar NPC
      </button>
    </form>
  );
}