import { duffel } from './setup.js';

const getPassengers = (num) => {
  const passengers = [];

  let count = 0;
  while (count < num) {
    passengers.push({ type: 'adult' });
    count++;
  }

  return passengers;
};

export const searchFlight = async (
  origin,
  destination,
  numPassengers,
  departure_date,
  return_date
) => {
  const passengers = getPassengers(numPassengers);

  const { data } = await duffel.offerRequests.create({
    slices: [
      {
        origin,
        destination,
        departure_date,
      },
      {
        origin: destination,
        destination: origin,
        departure_date: return_date,
      },
    ],
    passengers,
    return_offers: false,
  });

  const { id } = data;

  const results = await duffel.offers.list({
    offer_request_id: id,
    sort: 'total_amount',
  });

  return results.data;
};
