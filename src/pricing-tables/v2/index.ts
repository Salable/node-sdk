import { ApiRequest } from '@/src';
import { PricingTableVersions } from '..';
import { PricingTableResponse, SearchParamOptions } from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '@/src/constants';
import getUrl from '@/src/utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRICING_TABLES}`;

export const v2PricingTableMethods = (request: ApiRequest): PricingTableVersions['v2'] => ({
  getOne: async (productUuid: string, options): Promise<PricingTableResponse> => {
    return request(getUrl(`${baseUrl}/${productUuid}`, options as SearchParamOptions), {
      method: 'GET',
    }) as unknown as PricingTableResponse;
  },
});
