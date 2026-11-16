import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export const ALL = "Todos";

// Substitui o <select> da web: um grupo de "chips" tocáveis.
// Com includeAll, ganha a opção "Todos" (usada nos filtros).
export default function ChipSelect({
  label,
  value,
  options,
  onChange,
  includeAll = false,
}) {
  const items = includeAll ? [ALL, ...options] : options;

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chips}>
        {items.map((option) => {
          const active = option === value;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => onChange(option)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 6,
    width: "100%",
  },
  label: {
    color: colors.textSubtle,
    fontSize: 13,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
