import { StyleSheet, Text, View } from "react-native";
import { supportsSystemNotifications } from "../helper/notificationsHelper";
import { colors } from "../theme";

const messages = {
  connecting: "🟠 Conectando ao tempo real...",
  listening: "🟢 Escutando avisos em tempo real",
  error: "🔴 Sem conexão em tempo real (tentando reconectar)",
  local: "📱 Modo local: sem Supabase, os avisos ficam só neste aparelho",
};

// Equivale ao "Status da Conexão" do material MOBILE_009.
export default function RealtimeStatus({ connection, permissionGranted }) {
  const noPermission = supportsSystemNotifications && permissionGranted === false;

  return (
    <View style={styles.group}>
      <View style={styles.pill}>
        <Text style={styles.text}>{messages[connection] ?? messages.local}</Text>
      </View>
      {noPermission ? (
        <View style={styles.pill}>
          <Text style={styles.text}>
            🟠 Sem permissão para notificações: os avisos só aparecem na lista
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    alignItems: "flex-start",
    gap: 6,
    marginTop: 4,
  },
  pill: {
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
