import { ApiRequest } from '@/src';
import { PlanVersions } from '..';
import {
    IPlanCheckoutParams,
    Plan,
    PlanCapability,
    PlanCheckout,
    PlanCheckoutInputParams,
    PlanCheckoutKey,
    PlanCurrency,
    PlanFeature,
} from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '@/src/constants';
import defaultParametersCheckoutFactory from '@/src/utils/default-parameters-checkout-factory';

export const v2PlanMethods = (request: ApiRequest): PlanVersions['v2'] => ({
    getOne: async (planUuid: string): Promise<Plan> => {
        return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}/${planUuid}`, {
            method: 'GET',
        }) as unknown as Plan;
    },

    getCheckoutLink: async (
        planUuid: string,
        queryParams: PlanCheckoutInputParams,
    ): Promise<PlanCheckout> => {
        const encodedParams = new URLSearchParams();

        const flatCheckoutDefaultParams = defaultParametersCheckoutFactory(queryParams);
        const flatParams: IPlanCheckoutParams = Object.assign(
            {
                granteeId: queryParams.granteeId,
                member: queryParams.member,
                successUrl: queryParams.successUrl,
                cancelUrl: queryParams.cancelUrl,
                contactUsLink: queryParams.contactUsLink,
                quantity: queryParams.quantity,
            },
            flatCheckoutDefaultParams,
        );

        for (const key of Object.keys(flatParams)) {
            const itemKey = key as PlanCheckoutKey;
            const itemValue = flatParams[itemKey];
            if (itemValue) encodedParams.set(itemKey, String(itemValue));
        }
        return request(
            `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}/${planUuid}/checkoutlink?${encodedParams.toString()}`,
            {
                method: 'GET',
            },
        ) as unknown as PlanCheckout;
    },

    getFeatures: async (planUuid: string): Promise<PlanFeature[]> => {
        return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}/${planUuid}/features`, {
            method: 'GET',
        }) as unknown as PlanFeature[];
    },

    getCapabilities: async (planUuid: string): Promise<PlanCapability[]> => {
        return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}/${planUuid}/capabilities`, {
            method: 'GET',
        }) as unknown as PlanCapability[];
    },
    getCurrencies: async (planUuid: string): Promise<PlanCurrency[]> => {
        return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PLANS}/${planUuid}/currencies`, {
            method: 'GET',
        }) as unknown as PlanCurrency[];
    },
});
