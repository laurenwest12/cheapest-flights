import { airports } from '../data/airports.js';

//Function that takes an array of country codes and returns only airport codes within those counties
export const filterAirportsByCountry = (countries) => {
  const filteredAirports = airports.filter((airport) =>
    countries.includes(airport.country)
  );
  return filteredAirports.map(({ iata_code }) => iata_code);
};
