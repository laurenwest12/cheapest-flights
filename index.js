import express from 'express';

const app = express();

app.listen(3000, async () => {
  console.log('Cheapest flight is running...');
});
