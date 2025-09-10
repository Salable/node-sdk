import { ApiRequest } from '../../types';
import { PlanVersions } from '..';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '../../constants';
import getUrl from '../../utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}`;

export const v3PlanMethods = (request: ApiRequest): PlanVersions['v3'] => ({
  getAll: (options) => request(getUrl(`${baseUrl}`, options), { method: 'GET' }),
  getOne: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}`, options), { method: 'GET' }),
  getCheckoutLink: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/checkout-link`, options), { method: 'GET' }),
});
