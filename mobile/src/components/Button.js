import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

// variant: "primary" | "secondary" | "danger"
export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles[`${variant}Pressed`],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  primaryPressed: {
    backgroundColor: colors.primaryPressed,
  },
  primaryText: {
    color: "#fff",
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: colors.border,
  },
  secondaryPressed: {
    backgroundColor: colors.surface,
  },
  secondaryText: {
    color: colors.textMuted,
    fontWeight: "normal",
  },
  danger: {
    backgroundColor: "transparent",
    borderColor: colors.danger,
  },
  dangerPressed: {
    backgroundColor: colors.surface,
  },
  dangerText: {
    color: colors.danger,
  },
});
