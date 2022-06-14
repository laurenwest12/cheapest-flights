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

const searchFlightWithSingleDestination = async (
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
        destination: '00AK',
        departure_date,
      },
      {
        origin: '00AK',
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

export const searchFlights = async (
  origin,
  destinations,
  numPassengers,
  departure_date,
  return_date
) => {
  const flights = [];

  for (let i = 0; i < destinations.length; ++i) {
    const dest = destinations[i];
    const results = await searchFlightWithSingleDestination(
      origin,
      dest,
      numPassengers,
      departure_date,
      return_date
    );
  }
};
