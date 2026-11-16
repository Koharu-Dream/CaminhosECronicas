import { StyleSheet, View } from "react-native";
import StatItem from "./StatItem";

// stats: [{ label, value }, ...]
export default function StatList({ stats }) {
  return (
    <View style={styles.list}>
      {stats.map((stat) => (
        <StatItem key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginVertical: 16,
  },
});
