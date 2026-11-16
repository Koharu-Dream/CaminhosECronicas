import { useState } from "react";
import { StyleSheet, View } from "react-native";
import options from "../data/travel.json";
import { colors } from "../theme";
import Button from "./Button";
import ChipSelect from "./ChipSelect";
import Field from "./Field";
import { Subtitle } from "./Typography";

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

function validate(form) {
  const errors = {};
  if (form.origin.trim() === "") errors.origin = "Informe a origem";
  if (form.destination.trim() === "") errors.destination = "Informe o destino";

  const distance = Number(form.distance.replace(",", "."));
  if (!Number.isFinite(distance) || distance <= 0) {
    errors.distance = "Use um número maior que zero";
  }

  const partySize = Number(form.partySize);
  if (!Number.isInteger(partySize) || partySize < 1) {
    errors.partySize = "Use um número inteiro (mínimo 1)";
  }
  return errors;
}

export default function TravelForm({ onCreate }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function update(name, value) {
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  }

  function handleSubmit() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onCreate({ ...form, distance: form.distance.replace(",", ".") });
  }

  return (
    <View style={styles.form}>
      <Subtitle style={styles.title}>Nova viagem</Subtitle>

      <View style={styles.fields}>
        <Field
          label="Origem *"
          value={form.origin}
          onChangeText={(text) => update("origin", text)}
          placeholder="Neverwinter"
          error={errors.origin}
        />
        <Field
          label="Destino *"
          value={form.destination}
          onChangeText={(text) => update("destination", text)}
          placeholder="Waterdeep"
          error={errors.destination}
        />
        <Field
          label="Distância (km) *"
          value={form.distance}
          onChangeText={(text) => update("distance", text)}
          placeholder="200"
          keyboardType="numeric"
          error={errors.distance}
        />
        <Field
          label="Personagens *"
          value={form.partySize}
          onChangeText={(text) => update("partySize", text)}
          keyboardType="numeric"
          error={errors.partySize}
        />
        <ChipSelect
          label="Ritmo"
          value={form.pace}
          options={paces}
          onChange={(value) => update("pace", value)}
        />
        <ChipSelect
          label="Terreno"
          value={form.terrain}
          options={terrains}
          onChange={(value) => update("terrain", value)}
        />
      </View>

      <Button title="Iniciar viagem" onPress={handleSubmit} />
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
