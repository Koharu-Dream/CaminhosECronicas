import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

// Botão de voltar reutilizável. Se não houver histórico (ex.: página
// recarregada na web), vai para a rota `fallback`.
export default function BackButton({ fallback = "/", label = "← Voltar" }) {
  const router = useRouter();

  function handlePress() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallback);
    }
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={styles.back}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 8,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
