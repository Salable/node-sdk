import { ApiRequest } from '../../../src';
import { SALABLE_BASE_URL } from '../../../src/constants';
import getUrl from '../../../src/utils/get-url';
import { UsageVersions } from '../index';

const baseUrl = `${SALABLE_BASE_URL}/usage`;

export const v2UsageMethods = (request: ApiRequest): UsageVersions['v2'] => ({
  getAllUsageRecords: (options) => request(getUrl(baseUrl, options), { method: 'GET' }),
  getCurrentUsageRecord: (options) => request(getUrl(`${baseUrl}/current`, options), { method: 'GET' }),
  updateLicenseUsage: ({granteeId, planUuid, increment, idempotencyKey}) => request(baseUrl, { method: 'PUT', headers: { 'unique-key': idempotencyKey }, body: JSON.stringify({ granteeId, planUuid, countOptions: { increment } }) }),
});
