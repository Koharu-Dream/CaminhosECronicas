import { StyleSheet, View } from "react-native";
import { colors } from "../theme";
import { getTravelStats } from "../utils/travel";
import StatList from "./StatList";
import { Small } from "./Typography";

export default function TravelStatus({ trip }) {
  const { kmPerDay, traveled, progress, daysLeft, rations } =
    getTravelStats(trip);

  const stats = [
    { label: "Dia", value: trip.day },
    { label: "Percorrido", value: `${traveled} km` },
    { label: "Restante", value: `${trip.remaining} km` },
    { label: "Velocidade", value: `${kmPerDay} km/dia` },
    { label: "Dias restantes", value: daysLeft },
    { label: "Rações necessárias", value: rations },
    { label: "Ritmo", value: trip.pace },
    { label: "Terreno", value: trip.terrain },
    { label: "Clima", value: trip.weather },
  ];

  return (
    <View>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
      <Small style={styles.progress}>
        {progress}% do caminho
        {trip.remaining === 0 ? " · O grupo chegou ao destino!" : ""}
      </Small>

      <StatList stats={stats} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 12,
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  progress: {
    marginTop: 6,
  },
});
