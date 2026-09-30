import { useState } from "react";
import BackButton from "../components/BackButton";
import TravelForm from "../components/TravelForm";
import TravelStatus from "../components/TravelStatus";
import TravelControls from "../components/TravelControls";
import Timeline from "../components/Timeline";
import options from "../data/travel.json";

function getKmPerDay(trip) {
  const pace = options.paces.find((item) => item.name === trip.pace);
  const terrain = options.terrains.find((item) => item.name === trip.terrain);
  return Math.round(pace.kmPerDay * terrain.multiplier);
}

export default function Travel() {
  const [trip, setTrip] = useState(null);
  const [log, setLog] = useState([]);

  function handleCreate(data) {
    setTrip({
      origin: data.origin,
      destination: data.destination,
      distance: Number(data.distance),
      remaining: Number(data.distance),
      partySize: Number(data.partySize),
      pace: data.pace,
      terrain: data.terrain,
      weather: "Normal",
      day: 1,
    });
    setLog([
      {
        id: 1,
        day: 1,
        text: `Saída de ${data.origin} rumo a ${data.destination}`,
      },
    ]);
  }

  function handleChange(field, label, value, reason) {
    const text =
      `${label}: ${trip[field]} → ${value}` + (reason ? ` (${reason})` : "");
    setTrip({ ...trip, [field]: value });
    setLog([...log, { id: log.length + 1, day: trip.day, text }]);
  }

  function handleAdvance() {
    const remaining = Math.max(0, trip.remaining - getKmPerDay(trip));
    const traveled = trip.remaining - remaining;
    const arrived = remaining === 0;
    const text = arrived
      ? `Chegada a ${trip.destination} (${traveled} km neste dia)`
      : `Viajaram ${traveled} km`;

    setTrip({ ...trip, remaining, day: arrived ? trip.day : trip.day + 1 });
    setLog([...log, { id: log.length + 1, day: trip.day, text }]);
  }

  function handleReset() {
    setTrip(null);
    setLog([]);
  }

  return (
    <main className="container">
      <BackButton href="/" />
      <h1>Viagem</h1>

      {!trip && <TravelForm onCreate={handleCreate} />}

      {trip && (
        <>
          <h2>
            {trip.origin} → {trip.destination}
          </h2>
          <TravelStatus trip={trip} kmPerDay={getKmPerDay(trip)} />
          <TravelControls
            trip={trip}
            onChange={handleChange}
            onAdvance={handleAdvance}
            onReset={handleReset}
          />
          <Timeline entries={log} />
        </>
      )}
    </main>
  );
}