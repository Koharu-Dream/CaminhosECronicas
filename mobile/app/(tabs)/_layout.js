import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../src/theme";

function tabIcon(name) {
  return ({ color, size }) => <Ionicons name={name} color={color} size={size} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Início", tabBarIcon: tabIcon("home") }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{ title: "Campanhas", tabBarIcon: tabIcon("map") }}
      />
      <Tabs.Screen
        name="events"
        options={{ title: "Eventos", tabBarIcon: tabIcon("dice") }}
      />
      <Tabs.Screen
        name="npcs"
        options={{ title: "NPCs", tabBarIcon: tabIcon("people") }}
      />
      <Tabs.Screen
        name="avisos"
        options={{ title: "Avisos", tabBarIcon: tabIcon("notifications") }}
      />
    </Tabs>
  );
}
