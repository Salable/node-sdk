import { RESOURCE_NAMES, SALABLE_BASE_URL } from '../../constants';
import { EntitlementVersions } from '..';
import getUrl from '../../utils/get-url';
import { ApiRequest } from '../../types';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.ENTITLEMENTS}`;

export const v3EntitlementMethods = (request: ApiRequest): EntitlementVersions['v3'] => ({
  check: (options) => request(getUrl(`${baseUrl}/check`, options), { method: 'GET' }),
});