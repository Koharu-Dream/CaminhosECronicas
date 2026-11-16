import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import NoticeBanner from "../src/components/NoticeBanner";
import { JourneyProvider } from "../src/context/JourneyContext";
import { NotificationsProvider } from "../src/context/NotificationsContext";
import { colors } from "../src/theme";

// Layout raiz: provedor do estado global + navegação em pilha.
// As abas ficam em app/(tabs); campanha e viagem abrem por cima (com "voltar").
export default function RootLayout() {
  return (
    <JourneyProvider>
      <NotificationsProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        />
        <NoticeBanner />
      </NotificationsProvider>
    </JourneyProvider>
  );
}
