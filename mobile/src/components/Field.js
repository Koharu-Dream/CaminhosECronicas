import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme";

// Campo de texto com rótulo e mensagem de erro. As demais props
// (value, onChangeText, placeholder, keyboardType...) vão direto ao TextInput.
export default function Field({ label, error, wide = false, ...inputProps }) {
  return (
    <View style={[styles.field, wide && styles.wide]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          inputProps.multiline && styles.multiline,
          error && styles.inputError,
        ]}
        placeholderTextColor={colors.textSubtle}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexGrow: 1,
    flexBasis: 220,
    gap: 4,
  },
  // Ocupa a linha inteira (e funciona tanto em linha quanto em coluna).
  wide: {
    width: "100%",
    flexGrow: 0,
    flexBasis: "auto",
  },
  label: {
    color: colors.textSubtle,
    fontSize: 13,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
  },
  multiline: {
    minHeight: 72,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: 13,
  },
});
