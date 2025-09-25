import { ApiRequest } from '../../types';
import { ProductVersions } from '..';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '../../constants';
import getUrl from '../../utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}`;

export const v3ProductMethods = (request: ApiRequest): ProductVersions['v3'] => ({
  getAll: (options) => request(getUrl(baseUrl, options), { method: 'GET' }),
  getOne: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}`, options), { method: 'GET' }),
  getPricingTable: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/pricing-table`, options), { method: 'GET' }),
});
