import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme";
import Button from "./Button";
import Field from "./Field";
import { Subtitle } from "./Typography";

const fields = [
  { name: "name", label: "Nome", required: true },
  { name: "race", label: "Raça", required: true },
  { name: "occupation", label: "Ocupação", required: true },
  { name: "location", label: "Local", required: true },
  { name: "personality", label: "Personalidade", required: false },
  { name: "notes", label: "Notas", required: false, multiline: true },
];

const emptyForm = {
  name: "",
  race: "",
  occupation: "",
  location: "",
  personality: "",
  notes: "",
};

export default function NPCForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(name, value) {
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  }

  async function handleSubmit() {
    const found = {};
    fields.forEach((field) => {
      if (field.required && form[field.name].trim() === "") {
        found[field.name] = "Campo obrigatório";
      }
    });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    await onAdd(form);
    setSaving(false);
    setForm(emptyForm);
  }

  return (
    <View style={styles.form}>
      <Subtitle style={styles.title}>Novo NPC</Subtitle>

      <View style={styles.fields}>
        {fields.map((field) => (
          <Field
            key={field.name}
            label={field.required ? `${field.label} *` : field.label}
            value={form[field.name]}
            onChangeText={(text) => handleChange(field.name, text)}
            error={errors[field.name]}
            multiline={field.multiline}
            wide={field.multiline}
          />
        ))}
      </View>

      <Button
        title={saving ? "Salvando..." : "+ Adicionar NPC"}
        onPress={handleSubmit}
        disabled={saving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
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
  fields: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
