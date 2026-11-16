import { Platform } from "react-native";

// Gerenciador de alertas (MOBILE_009): cuida da permissão e da exibição da
// notificação com a biblioteca Expo Notifications.

// Notificações do sistema existem só no Android e no iOS. Na web o módulo nem
// chega a ser carregado: o app mostra um banner dentro da própria tela
// (componente NoticeBanner).

export const supportsSystemNotifications = Platform.OS !== "web";

let Notifications = null;

function getNotifications() {
  if (!supportsSystemNotifications) return null;

  if (!Notifications) {
    Notifications = require("expo-notifications");

    // Configuração: permitir som e alerta mesmo com o app aberto.
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }
  return Notifications;
}

// Carrega já na abertura do app para o handler estar pronto antes do 1º aviso.
try {
  getNotifications();
} catch (error) {
  console.warn("Expo Notifications indisponível:", error);
}

// Pede permissão (necessária também para notificação local).
// Devolve true se o aparelho pode mostrar notificações.
export async function registerForLocalNotificationsAsync() {
  try {
    const notif = getNotifications();
    if (!notif) return true; // web: não há permissão do sistema para pedir

    const { status: existingStatus } = await notif.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await notif.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === "granted";
  } catch (error) {
    console.warn("Não foi possível pedir permissão de notificação:", error);
    return false;
  }
}

// Dispara o alerta no próprio celular. Devolve true se foi agendado.
export async function triggerLocalNotification(title, body) {
  try {
    const notif = getNotifications();
    if (!notif) return false;

    await notif.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null, // null = disparar agora mesmo
    });
    return true;
  } catch (error) {
    console.warn("Não foi possível exibir a notificação:", error);
    return false;
  }
}
