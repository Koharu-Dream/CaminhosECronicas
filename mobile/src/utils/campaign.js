// Mistura os dados fixos da campanha (JSON) com o andamento da viagem.
// Assim o dashboard mostra dia, clima e distância restante "ao vivo".
export function mergeCampaign(campaign, journey) {
  const trip = journey?.trip;
  if (!trip) return campaign;

  const traveled = trip.distance - trip.remaining;
  let currentLocation;
  if (trip.remaining === 0) {
    currentLocation = trip.destination;
  } else if (traveled === 0) {
    currentLocation = trip.origin;
  } else {
    currentLocation = `Entre ${trip.origin} e ${trip.destination}`;
  }

  return {
    ...campaign,
    currentLocation,
    day: trip.day,
    weather: trip.weather,
    kmRemaining: trip.remaining,
  };
}
