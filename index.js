import express from 'express';
import { searchFlights } from './duffel/searchFlights.js';
import { filterAirportsByCountry } from './functions/filterAirportsByCountry.js';

const app = express();

app.listen(3000, async () => {
  console.log('Cheapest flight is running...');
  const usAirpots = filterAirportsByCountry(['United States']);
  // await searchFlights(
  //   'NYC',
  //   usAirpots.slice(0, 5),
  //   1,
  //   '2022-07-01',
  //   '2022-07-03'
  // );
});
