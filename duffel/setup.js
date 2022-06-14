import { Duffel } from '@duffel/api';
import { accessToken } from '../config.js';

export const duffel = new Duffel({
  token: accessToken,
});
