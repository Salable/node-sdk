import { SALABLE_BASE_URL } from '../../constants';
import { LicenseVersions } from '..';
import getUrl from '../../utils/get-url';
import { ApiRequest } from '../../types';

const baseUrl = `${SALABLE_BASE_URL}/licenses`;

export const v2LicenseMethods = (request: ApiRequest): LicenseVersions['v2'] => ({
  getAll: (options) => request(getUrl(baseUrl, options), { method: 'GET' }),
  getOne: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}`, options), { method: 'GET' }),
  getCount: (options) => request(getUrl(`${baseUrl}/count`, options), { method: 'GET' }),
  getForPurchaser: (options) => request(getUrl(`${baseUrl}/purchaser`, options), { method: 'GET' }),
  getForGranteeId: (granteeId, options) => request(getUrl(`${baseUrl}/granteeId/${granteeId}`, options), { method: 'GET' }),
  create: (data) => request(baseUrl, { method: 'POST', body: JSON.stringify(data) }),
  createMany: (data) => request(baseUrl, { method: 'POST', body: JSON.stringify(data) }),
  update: (uuid, data) => request(`${baseUrl}/${uuid}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateMany: (data) => request(baseUrl, { method: 'PUT', body: JSON.stringify(data) }),
  cancel: (uuid) => request(`${baseUrl}/${uuid}`, { method: 'DELETE' }),
  cancelMany: (data) => request(`${baseUrl}/cancel`, { method: 'POST', body: JSON.stringify(data) }),
  check: (options) => request(getUrl(`${baseUrl}/check`, options), { method: 'GET' }),
});
