import StatItem from "./StatItem";
import styles from "./TravelStatus.module.css";

export default function TravelStatus({ trip, kmPerDay }) {
  const traveled = trip.distance - trip.remaining;
  const progress = Math.round((traveled / trip.distance) * 100);
  const daysLeft = Math.ceil(trip.remaining / kmPerDay);
  const rations = daysLeft * trip.partySize;

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
    <section className={styles.status}>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.progress}>
        {progress}% do caminho
        {trip.remaining === 0 && " · O grupo chegou ao destino!"}
      </p>

      <div className="statList">
        {stats.map((stat) => (
          <StatItem key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}