import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import Button from "../../src/components/Button";
import Screen, { tabEdges } from "../../src/components/Screen";
import { Body, Small, Title } from "../../src/components/Typography";

export default function Home() {
  const router = useRouter();

  return (
    <Screen edges={tabEdges}>
      <Title>Caminhos e Crônicas</Title>
      <Body>
        Ferramenta de apoio ao Mestre de D&D 2014: gere eventos, consulte NPCs
        e acompanhe a viagem da campanha.
      </Body>

      <View style={styles.actions}>
        <Button
          title="Selecionar campanha"
          onPress={() => router.navigate("/campaigns")}
        />
        <Button title="Ver eventos" onPress={() => router.navigate("/events")} />
        <Button title="Ver NPCs" onPress={() => router.navigate("/npcs")} />
      </View>

      <Small style={styles.footer}>
        Caminhos e Crônicas · Projeto acadêmico · FATEC Mogi Mirim
      </Small>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12,
    marginTop: 24,
  },
  footer: {
    marginTop: 32,
    textAlign: "center",
  },
});
