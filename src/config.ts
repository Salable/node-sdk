import { Salable } from '.';
import { SALABLE_API_KEY } from './constants';

export const invalidApi = new Salable('invalid-api-key');
export const api = new Salable(SALABLE_API_KEY);
