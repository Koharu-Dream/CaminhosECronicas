import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

// Componente base: recebe título, etiqueta e conteúdo (children).
export default function Card({ title, tag, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {tag ? (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 360,
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
  },
  body: {
    gap: 8,
  },
});
