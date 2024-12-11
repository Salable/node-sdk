import { ApiRequest } from '../../types';
import { PlanVersions } from '..';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '../../constants';
import getUrl from '../../utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}`;

export const v2PlanMethods = (request: ApiRequest): PlanVersions['v2'] => ({
  getOne: (uuid) => request(`${baseUrl}/${uuid}`, { method: 'GET' }),
  getCheckoutLink: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/checkoutlink`, options), { method: 'GET' }),
  getFeatures: (uuid) => request(`${baseUrl}/${uuid}/features`, { method: 'GET' }),
  getCapabilities: (uuid) => request(`${baseUrl}/${uuid}/capabilities`, { method: 'GET' }),
  getCurrencies: (uuid) => request(`${baseUrl}/${uuid}/currencies`, { method: 'GET' }),
});
