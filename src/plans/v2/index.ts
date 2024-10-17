import { ApiRequest } from '@/src';
import { PlanVersions } from '..';
import { Plan, PlanCapability, PlanCheckout, PlanCurrency, PlanFeature } from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '@/src/constants';
import getUrl from '@/src/utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}`;

export const v2PlanMethods = (request: ApiRequest): PlanVersions['v2'] => ({
  getOne: async (planUuid: string): Promise<Plan> => {
    return request(getUrl(`${baseUrl}/${planUuid}`, {}), {
      method: 'GET',
    }) as unknown as Plan;
  },

  getCheckoutLink: async (planUuid: string, options): Promise<PlanCheckout> => {
    return request(
      getUrl(`${baseUrl}/${planUuid}/checkoutlink`, { requirePaymentMethod: 'true', ...options }),
      {
        method: 'GET',
      },
    ) as unknown as PlanCheckout;
  },

  getFeatures: async (planUuid: string): Promise<PlanFeature[]> => {
    return request(getUrl(`${baseUrl}/${planUuid}/features`, {}), {
      method: 'GET',
    }) as unknown as PlanFeature[];
  },

  getCapabilities: async (planUuid: string): Promise<PlanCapability[]> => {
    return request(getUrl(`${baseUrl}/${planUuid}/capabilities`, {}), {
      method: 'GET',
    }) as unknown as PlanCapability[];
  },
  getCurrencies: async (planUuid: string): Promise<PlanCurrency[]> => {
    return request(getUrl(`${baseUrl}/${planUuid}/currencies`, {}), {
      method: 'GET',
    }) as unknown as PlanCurrency[];
  },
});
