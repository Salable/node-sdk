import { ApiRequest } from '@/src';
import { PricingTableVersions } from '..';
import {
    PricingTableCheckoutKey,
    PricingTableOptions,
    Product,
} from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '@/src/constants';
import defaultParametersCheckoutFactory from '@/src/utils/default-parameters-checkout-factory';

export const v2PricingTableMethods = (request: ApiRequest): PricingTableVersions['v2'] => ({
    
    getOne: async (productUuid: string, options: PricingTableOptions): Promise<Product> => {

        const {
            globalPlanOptions: { granteeId, successUrl, cancelUrl, contactUsLink, member, ...rest },
            individualPlanOptions,
        } = options;

        const flatCheckoutDefaultParams = defaultParametersCheckoutFactory(rest);
        const flatCheckoutParams = Object.assign(
            {
                globalGranteeId: granteeId,
                globalSuccessUrl: successUrl,
                globalCancelUrl: cancelUrl,
                contactUsLink,
                member,
            },
            flatCheckoutDefaultParams,
        );
        let paramsStr = '';
        let query = '';
        for (const key of Object.keys(flatCheckoutParams)) {
            const itemKey = key as PricingTableCheckoutKey;
            const itemValue = flatCheckoutParams[itemKey];
            if (itemValue) paramsStr += `&${itemKey}=${itemValue}`;
        }

        if (individualPlanOptions) {
            let granteeIds = '';
            let cancelUrls = '';
            let successUrls = '';
            for (const key of Object.keys(individualPlanOptions)) {
                if (individualPlanOptions[key].granteeId) {
                    granteeIds += `${key},${individualPlanOptions[key].granteeId as string}`;
                }
                if (individualPlanOptions[key].cancelUrl) {
                    cancelUrls += `${key},${individualPlanOptions[key].cancelUrl as string}`;
                }
                if (individualPlanOptions[key].successUrl) {
                    successUrls += `${key},${individualPlanOptions[key].successUrl as string}`;
                }
            }
            if (granteeIds) paramsStr += `&granteeIds=${granteeIds}`;
            if (cancelUrls) paramsStr += `&cancelUrls=${cancelUrls}`;
            if (successUrls) paramsStr += `&successUrls=${successUrls}`;
        }
        query = encodeURI(paramsStr);
        return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRICING_TABLES}/${productUuid}?${query}`, {
            method: 'GET',
        }) as unknown as Product;
    },
});
