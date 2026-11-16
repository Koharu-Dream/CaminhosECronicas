import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { Subtitle } from "./Typography";

export default function Timeline({ entries }) {
  return (
    <View>
      <Subtitle>Histórico da viagem</Subtitle>
      <View style={styles.list}>
        {entries.map((entry) => (
          <View key={entry.id} style={styles.item}>
            <Text style={styles.day}>Dia {entry.day}</Text>
            <Text style={styles.text}>{entry.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
    marginTop: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: 4,
    backgroundColor: colors.surface,
  },
  day: {
    color: colors.primary,
    fontWeight: "bold",
    minWidth: 48,
  },
  text: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 15,
  },
});
