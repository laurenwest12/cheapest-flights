import express from 'express';
import { searchFlights } from './duffel/searchFlights.js';
import { filterAirportsByCountry } from './functions/filterAirportsByCountry.js';

const app = express();

app.get('/flights', async (req, res) => {
  const usAirpots = filterAirportsByCountry(['United States']);
  const flights = await searchFlights(
    'NYC',
    usAirpots,
    1,
    '2022-07-22',
    '2022-07-24'
  );
  res.send(flights);
});

app.listen(3000, async () => {
  console.log('Cheapest flight is running...');
});
