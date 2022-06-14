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
    limit: 5,
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
  let flights = [];

  for (let i = 0; i < destinations.length; ++i) {
    const destination = destinations[i];
    const results = await searchFlightWithSingleDestination(
      origin,
      destination,
      numPassengers,
      departure_date,
      return_date
    );
    flights.push(results);
  }

  const flightsSortedByPrice = flights
    .flat()
    .sort((a, b) =>
      parseFloat(a.total_amount) > parseFloat(b.total_amount) ? 1 : -1
    );

  return flightsSortedByPrice.map(({ total_amount, slices, owner }) => {
    const airline = owner.name;
    const destinationCity = slices[0].destination.city_name;
    const destinationAirport = slices[0].destination.iata_code;
    return {
      total_amount,
      airline,
      destinationCity,
      destinationAirport,
    };
  });
};
