import { ApiRequest } from "@/src";
import { ProductVersions } from "..";
import { IPlan, IProduct, IProductCapability, IProductCurrency, IProductPricingTable, PricingTableCheckoutKey, PricingTableParameters } from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from "@/src/constants";
import defaultParametersCheckoutFactory from "@/src/utils/default-parameters-checkout-factory";


export const v2ProductMethods = (request: ApiRequest): ProductVersions['v2'] => ({
  getAll: async (): Promise<IProduct[]> => {
    return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}`, {
      method: 'GET',
    }) as unknown as IProduct[];
  },

  getOne: async (productUuid: string): Promise<IProduct> => {
    return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}/${productUuid}`, {
      method: 'GET',
    }) as unknown as IProduct;
  },

  getPricingTable: async (
    productUuid: string,
    queryParams: PricingTableParameters,
  ): Promise<IProductPricingTable> => {

    const {
      globalPlanOptions: { granteeId, successUrl, cancelUrl, contactUsLink, member, ...rest },
      individualPlanOptions,
    } = queryParams;

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

    return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}/${productUuid}/pricingtable?${query}`, {
      method: 'GET',
    }) as unknown as IProductPricingTable;
  },

  getPlans: async (productUuid: string): Promise<IPlan[]> => {
    return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}/${productUuid}/plans`, {
      method: 'GET',
    }) as unknown as IPlan[];
  },

  getFeatures: async (productUuid: string): Promise<IProduct> => {
    return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}/${productUuid}/features`, {
      method: 'GET',
    }) as unknown as IProduct;
  },

  getCapabilities: async (productUuid: string): Promise<IProductCapability[]> => {
    return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}/${productUuid}/capabilities`, {
      method: 'GET',
    }) as unknown as IProductCapability[];
  },
  
  getCurrencies: async (productUuid: string): Promise<IProductCurrency[]> => {
    return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}/${productUuid}/currencies`, {
      method: 'GET',
    }) as unknown as IProductCurrency[];
  },
});