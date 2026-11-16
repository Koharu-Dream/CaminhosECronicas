import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const messages = {
  loading: "Carregando...",
  cloud: "☁️ Sincronizado com a nuvem (Supabase)",
  offline: "📴 Sem conexão: usando os dados salvos no aparelho",
  local: "📱 Modo local: dados salvos só no aparelho",
};

export default function SyncStatus({ status }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>{messages[status] ?? messages.local}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  text: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
