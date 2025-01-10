import { SALABLE_BASE_URL } from '../../constants';
import { EventVersions } from '..';
import getUrl from '../../utils/get-url';
import { ApiRequest } from '../../types';

const baseUrl = `${SALABLE_BASE_URL}/events`;

export const v2EventMethods = (request: ApiRequest): EventVersions['v2'] => ({
  getOne: (uuid) => request(getUrl(`${baseUrl}/${uuid}`), { method: 'GET' }),
});
