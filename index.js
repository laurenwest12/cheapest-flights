import express from 'express';
import { searchFlight } from './duffel/searchFlights.js';

const app = express();

app.listen(3000, async () => {
  console.log('Cheapest flight is running...');
});
