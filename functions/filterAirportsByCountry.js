import { airports } from '../data/airports.js';

//Function that takes an array of country codes and returns only airport codes within those counties
const filterAirportsByCountry = (countries) => {
  const airportCodes = Object.keys(airports);
  const filteredAirports = airportCodes.filter((airport) =>
    countries.includes(airports[airport].country)
  );
  return filteredAirports;
};

export { filterAirportsByCountry };
