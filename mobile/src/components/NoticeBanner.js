import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotifications } from "../context/NotificationsContext";
import { colors } from "../theme";

// Pop-up no topo da tela quando chega um aviso. É usado na web; no Android e
// no iOS quem avisa é a notificação do sistema (Expo Notifications).
export default function NoticeBanner() {
  const { banner, dismissBanner } = useNotifications();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!banner) return undefined;
    const timer = setTimeout(dismissBanner, 7000);
    return () => clearTimeout(timer);
  }, [banner, dismissBanner]);

  if (!banner) return null;

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { top: insets.top + 8 }]}>
      <Pressable
        accessibilityRole="alert"
        onPress={dismissBanner}
        style={styles.banner}
      >
        <Text style={styles.label}>🔔 Novo aviso do Mestre</Text>
        <Text style={styles.title}>{banner.title}</Text>
        <Text style={styles.body}>{banner.body}</Text>
        <Text style={styles.hint}>Toque para fechar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 1000,
    alignItems: "center",
  },
  banner: {
    width: "100%",
    maxWidth: 560,
    gap: 4,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: colors.surface,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "bold",
  },
  body: {
    color: colors.textMuted,
    fontSize: 15,
  },
  hint: {
    color: colors.textSubtle,
    fontSize: 11,
  },
});
