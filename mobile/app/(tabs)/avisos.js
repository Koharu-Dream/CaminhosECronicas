import Card from "../../src/components/Card";
import CardList from "../../src/components/CardList";
import NotificationForm from "../../src/components/NotificationForm";
import RealtimeStatus from "../../src/components/RealtimeStatus";
import Screen, { tabEdges } from "../../src/components/Screen";
import { Body, Subtitle, Title } from "../../src/components/Typography";
import { useNotifications } from "../../src/context/NotificationsContext";
import { formatDateTime } from "../../src/utils/notifications";

export default function Avisos() {
  const { items, connection, permissionGranted } = useNotifications();

  return (
    <Screen edges={tabEdges}>
      <Title>Avisos do Mestre</Title>
      <Body>
        Quando o Mestre dispara um aviso, todos os aparelhos com o app aberto
        recebem na hora, sem precisar atualizar a tela.
      </Body>
      <RealtimeStatus
        connection={connection}
        permissionGranted={permissionGranted}
      />

      <NotificationForm />

      <Subtitle>Histórico ({items.length})</Subtitle>
      {items.length === 0 ? <Body>Nenhum aviso por aqui ainda.</Body> : null}

      <CardList>
        {items.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            tag={formatDateTime(item.created_at)}
          >
            <Body>{item.body}</Body>
          </Card>
        ))}
      </CardList>
    </Screen>
  );
}
