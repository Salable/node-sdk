import { SALABLE_BASE_URL } from '../../constants';
import { SessionVersions } from '..';
import { ApiRequest } from '../../types';

const baseUrl = `${SALABLE_BASE_URL}/sessions`;

export const v2SessionMethods = (request: ApiRequest): SessionVersions['v2'] => ({
  create: (data) => request(baseUrl, { method: 'POST', body: JSON.stringify(data) }),
});
