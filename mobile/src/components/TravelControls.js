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

export default function TravelControls({ trip, onChange, onAdvance, onReset }) {
  const [reason, setReason] = useState("");

  function change(field, label, value) {
    if (value === trip[field]) return;
    onChange(field, label, value, reason.trim());
    setReason("");
  }

  const arrived = trip.remaining === 0;

  return (
    <View style={styles.controls}>
      <Subtitle style={styles.title}>Controles da viagem</Subtitle>

      <Field
        label="Motivo da mudança (opcional, escreva antes de trocar)"
        value={reason}
        onChangeText={setReason}
        placeholder="Ex.: o grupo decidiu pegar uma trilha alternativa"
        wide
      />

      <ChipSelect
        label="Ritmo"
        value={trip.pace}
        options={paces}
        onChange={(value) => change("pace", "Ritmo", value)}
      />
      <ChipSelect
        label="Terreno"
        value={trip.terrain}
        options={terrains}
        onChange={(value) => change("terrain", "Terreno", value)}
      />
      <ChipSelect
        label="Clima"
        value={trip.weather}
        options={options.weathers}
        onChange={(value) => change("weather", "Clima", value)}
      />

      <View style={styles.actions}>
        <Button title="Avançar 1 dia" onPress={onAdvance} disabled={arrived} />
        <Button title="Nova viagem" variant="secondary" onPress={onReset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    gap: 14,
    marginVertical: 16,
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
});
