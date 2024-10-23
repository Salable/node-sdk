import { ApiRequest } from '../..';
import { PricingTableVersions } from '..';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '../../constants';
import getUrl from '../../utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRICING_TABLES}`;

export const v2PricingTableMethods = (request: ApiRequest): PricingTableVersions['v2'] => ({
  getOne: (productUuid, options) => request(getUrl(`${baseUrl}/${productUuid}`, options), { method: 'GET' }),
});
