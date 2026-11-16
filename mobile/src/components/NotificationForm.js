import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNotifications } from "../context/NotificationsContext";
import { colors } from "../theme";
import { validateNotification } from "../utils/notifications";
import Button from "./Button";
import Field from "./Field";
import { Subtitle } from "./Typography";

// Área do Mestre: título + mensagem + botão que dispara o aviso.
export default function NotificationForm() {
  const { send } = useNotifications();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  // O Alert do React Native não aparece na web, então o retorno é na tela.
  const [feedback, setFeedback] = useState(null);

  async function handleSend() {
    const problem = validateNotification(title, message);
    if (problem) {
      setFeedback({ type: "error", text: problem });
      return;
    }

    setSending(true);
    setFeedback(null);
    try {
      const result = await send(title, message);
      setFeedback({
        type: "ok",
        text:
          result.mode === "cloud"
            ? "Aviso enviado! Todos os aparelhos conectados recebem agora."
            : "Modo local: o aviso apareceu só neste aparelho. Configure o Supabase para enviar a todos.",
      });
      setTitle("");
      setMessage("");
    } catch (error) {
      console.warn("Falha ao enviar o aviso:", error);
      setFeedback({
        type: "error",
        text: "Não foi possível enviar. Verifique a conexão e o Supabase.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <View style={styles.form}>
      <Subtitle style={styles.title}>Área do Mestre</Subtitle>

      <Field
        label="Título *"
        value={title}
        onChangeText={setTitle}
        placeholder="Ex.: Emboscada na estrada!"
        wide
      />
      <Field
        label="Mensagem *"
        value={message}
        onChangeText={setMessage}
        placeholder="Ex.: Sessão começa às 20h, tragam as fichas."
        multiline
        wide
      />

      <Button
        title={sending ? "Enviando..." : "DISPARAR AVISO"}
        onPress={handleSend}
        disabled={sending}
      />

      {feedback ? (
        <Text
          accessibilityRole="alert"
          style={feedback.type === "ok" ? styles.ok : styles.error}
        >
          {feedback.text}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surfaceDark,
  },
  title: {
    marginTop: 0,
  },
  ok: {
    color: colors.success,
    fontSize: 15,
  },
  error: {
    color: colors.danger,
    fontSize: 15,
  },
});
