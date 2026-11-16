import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";

// Telas dentro das abas já têm a barra inferior, então não precisam da
// margem de segurança de baixo.
export const tabEdges = ["top", "left", "right"];
const allEdges = ["top", "bottom", "left", "right"];

export default function Screen({
  children,
  edges = allEdges,
  refreshControl,
}) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        refreshControl={refreshControl}
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  // Limita a largura em tablets e na web, como o .container do projeto web.
  inner: {
    width: "100%",
    maxWidth: 1000,
    alignSelf: "center",
  },
});
