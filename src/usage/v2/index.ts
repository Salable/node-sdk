import { ApiRequest } from '../../../src';
import { SALABLE_BASE_URL } from '../../../src/constants';
import getUrl from '../../../src/utils/get-url';
import { UsageVersions } from '../index';

const baseUrl = `${SALABLE_BASE_URL}/usage`;

export const v2UsageMethods = (request: ApiRequest): UsageVersions['v2'] => ({
  getAllUsageRecords: (granteeId, options) => request(getUrl(baseUrl, { granteeId, ...options }), { method: 'GET' }),
  getCurrentUsageRecord: (granteeId, planUuid) => request(getUrl(`${baseUrl}/current`, { granteeId, planUuid }), { method: 'GET' }),
  updateLicenseUsage: (granteeId, planUuid, increment, idempotencyKey) => request(baseUrl, { method: 'PUT', headers: { 'unique-key': idempotencyKey }, body: JSON.stringify({ granteeId, planUuid, countOptions: { increment } }) }),
});
