import { ApiRequest } from '../../types';
import { ProductVersions } from '..';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '../../constants';
import getUrl from '../../utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}`;

export const v2ProductMethods = (request: ApiRequest): ProductVersions['v2'] => ({
  getAll: () => request(baseUrl, { method: 'GET' }),
  getOne: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}`, options), { method: 'GET' }),
  getPricingTable: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/pricingtable`, options), { method: 'GET' }),
  getPlans: (uuid) => request(getUrl(`${baseUrl}/${uuid}/plans`), { method: 'GET' }),
  getFeatures: (uuid) => request(`${baseUrl}/${uuid}/features`, { method: 'GET' }),
  getCapabilities: (uuid) => request(`${baseUrl}/${uuid}/capabilities`, { method: 'GET' }),
  getCurrencies: (uuid) => request(`${baseUrl}/${uuid}/currencies`, { method: 'GET' }),
});
