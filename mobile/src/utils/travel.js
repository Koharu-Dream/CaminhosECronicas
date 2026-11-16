import options from "../data/travel.json";

// Funções puras da viagem (mesma regra do projeto web):
// ritmo em km/dia x multiplicador do terreno (terreno difícil = metade).

export const emptyJourney = { trip: null, log: [], updatedAt: 0 };

export function getKmPerDay(trip) {
  const pace =
    options.paces.find((item) => item.name === trip.pace) ?? options.paces[1];
  const terrain =
    options.terrains.find((item) => item.name === trip.terrain) ??
    options.terrains[0];
  return Math.round(pace.kmPerDay * terrain.multiplier);
}

export function createJourney(form) {
  const distance = Number(form.distance);
  const trip = {
    origin: form.origin.trim(),
    destination: form.destination.trim(),
    distance,
    remaining: distance,
    partySize: Number(form.partySize),
    pace: form.pace,
    terrain: form.terrain,
    weather: "Normal",
    day: 1,
  };
  return {
    trip,
    log: [
      {
        id: 1,
        day: 1,
        text: `Saída de ${trip.origin} rumo a ${trip.destination}`,
      },
    ],
  };
}

export function changeCondition(journey, field, label, value, reason) {
  const { trip, log } = journey;
  if (!trip || trip[field] === value) return journey;

  const text =
    `${label}: ${trip[field]} → ${value}` + (reason ? ` (${reason})` : "");
  return {
    ...journey,
    trip: { ...trip, [field]: value },
    log: [...log, { id: log.length + 1, day: trip.day, text }],
  };
}

export function advanceDay(journey) {
  const { trip, log } = journey;
  if (!trip || trip.remaining === 0) return journey;

  const remaining = Math.max(0, trip.remaining - getKmPerDay(trip));
  const traveled = trip.remaining - remaining;
  const arrived = remaining === 0;
  const text = arrived
    ? `Chegada a ${trip.destination} (${traveled} km neste dia)`
    : `Viajaram ${traveled} km`;

  return {
    ...journey,
    trip: { ...trip, remaining, day: arrived ? trip.day : trip.day + 1 },
    log: [...log, { id: log.length + 1, day: trip.day, text }],
  };
}

export function getTravelStats(trip) {
  const kmPerDay = getKmPerDay(trip);
  const traveled = trip.distance - trip.remaining;
  const progress = Math.round((traveled / trip.distance) * 100);
  const daysLeft = Math.ceil(trip.remaining / kmPerDay);
  const rations = daysLeft * trip.partySize;
  return { kmPerDay, traveled, progress, daysLeft, rations };
}
