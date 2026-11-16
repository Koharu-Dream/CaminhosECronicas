import { StyleSheet, Text } from "react-native";
import { colors } from "../theme";

export function Title({ children, style }) {
  return (
    <Text accessibilityRole="header" style={[styles.title, style]}>
      {children}
    </Text>
  );
}

export function Subtitle({ children, style }) {
  return (
    <Text accessibilityRole="header" style={[styles.subtitle, style]}>
      {children}
    </Text>
  );
}

export function Body({ children, style }) {
  return <Text style={[styles.body, style]}>{children}</Text>;
}

export function Small({ children, style }) {
  return <Text style={[styles.small, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 24,
    marginBottom: 4,
    color: colors.text,
    fontSize: 22,
    fontWeight: "bold",
  },
  body: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
  },
  small: {
    color: colors.textSubtle,
    fontSize: 13,
  },
});
