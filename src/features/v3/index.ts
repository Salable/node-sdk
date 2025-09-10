import { SALABLE_BASE_URL } from '../../constants';
import getUrl from '../../utils/get-url';
import { ApiRequest } from '../../types';
import { FeatureVersions } from '../index';

const baseUrl = `${SALABLE_BASE_URL}/features`;

export const v3FeatureMethods = (request: ApiRequest): FeatureVersions['v3'] => ({
  getAll: (options) => request(getUrl(`${baseUrl}`, options), { method: 'GET' }),
});