import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import {
  registerForLocalNotificationsAsync,
  triggerLocalNotification,
} from "../helper/notificationsHelper";
import {
  fetchNotifications,
  sendNotification,
  subscribeToNotifications,
} from "../services/notificationService";
import { isSupabaseConfigured } from "../services/supabase";
import { mergeNotifications } from "../utils/notifications";

// Estado global dos avisos. Fica no layout raiz para o app ficar "escutando"
// o Supabase em qualquer tela, não só na aba Avisos.
//
// connection: "connecting" | "listening" | "error" | "local"

const NotificationsContext = createContext(null);
const isWeb = Platform.OS === "web";

export function NotificationsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [connection, setConnection] = useState(
    isSupabaseConfigured ? "connecting" : "local"
  );
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [banner, setBanner] = useState(null);

  // Android/iOS: notificação do sistema (Expo Notifications).
  // Web: banner dentro da tela, porque o navegador não tem esse recurso aqui.
  const announce = useCallback((item) => {
    if (isWeb) {
      setBanner(item);
    } else {
      triggerLocalNotification(item.title, item.body);
    }
  }, []);

  // A) Pede permissão para mostrar notificações.
  useEffect(() => {
    let active = true;
    registerForLocalNotificationsAsync().then((granted) => {
      if (active) setPermissionGranted(granted);
    });
    return () => {
      active = false;
    };
  }, []);

  // B) Liga o "radar" do Supabase Realtime e carrega o histórico.
  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let active = true;

    fetchNotifications()
      .then((rows) => {
        if (active) setItems((previous) => mergeNotifications(previous, rows));
      })
      .catch((error) => {
        console.warn("Não foi possível carregar o histórico de avisos:", error);
      });

    const unsubscribe = subscribeToNotifications(
      // C) Chegou um aviso novo: guarda na lista e dispara o alerta.
      (row) => {
        if (!active) return;
        setItems((previous) => mergeNotifications(previous, [row]));
        announce(row);
      },
      (status) => {
        if (!active) return;
        setConnection(status === "SUBSCRIBED" ? "listening" : "error");
      }
    );

    // Limpeza ao fechar o app.
    return () => {
      active = false;
      unsubscribe();
    };
  }, [announce]);

  // Ação do Mestre. Com Supabase: só salva no banco (o Realtime faz o resto).
  // Sem Supabase: modo local, o aviso aparece só neste aparelho.
  const send = useCallback(
    async (title, body) => {
      if (isSupabaseConfigured) {
        await sendNotification(title, body);
        return { mode: "cloud" };
      }

      const item = {
        id: `local-${Date.now()}`,
        title: title.trim(),
        body: body.trim(),
        created_at: new Date().toISOString(),
      };
      setItems((previous) => mergeNotifications(previous, [item]));
      announce(item);
      return { mode: "local" };
    },
    [announce]
  );

  const dismissBanner = useCallback(() => setBanner(null), []);

  const value = useMemo(
    () => ({ items, connection, permissionGranted, banner, dismissBanner, send }),
    [items, connection, permissionGranted, banner, dismissBanner, send]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications precisa estar dentro de <NotificationsProvider>."
    );
  }
  return context;
}
