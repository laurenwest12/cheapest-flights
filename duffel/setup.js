import { Duffel } from '@duffel/api';
import { accessToken } from '../config.js';

const duffel = new Duffel({
  token: accessToken,
});

export { duffel };
