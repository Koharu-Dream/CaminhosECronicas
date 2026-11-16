import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export default function StatItem({ label, value }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    minWidth: 130,
    flexGrow: 1,
    gap: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  label: {
    color: colors.textSubtle,
    fontSize: 12,
  },
  value: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});
