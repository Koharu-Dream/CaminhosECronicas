import { StyleSheet, View } from "react-native";

// Lista de cards em Flexbox: 1 coluna no celular, várias em tablet/web.
export default function CardList({ children }) {
  return <View style={styles.list}>{children}</View>;
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
  },
});
