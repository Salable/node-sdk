import { ApiRequest } from "@/src";
import { ProductVersions } from "..";
import {
  Plan,
  Product,
  ProductCapability,
  ProductCurrency,
  ProductPricingTable,
  SearchParamOptions,
} from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from "@/src/constants";
import getUrl from "@/src/utils/get-url";

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.PRODUCTS}`;

export const v2ProductMethods = (request: ApiRequest): ProductVersions['v2'] => ({
  getAll: async (): Promise<Product[]> => {
    return request(getUrl(baseUrl, {}), {
      method: 'GET',
    }) as unknown as Product[];
  },

  getOne: async (productUuid: string, options): Promise<Product> => {
    return request(getUrl(`${baseUrl}/${productUuid}`, options as SearchParamOptions), {
      method: 'GET',
    }) as unknown as Product;
  },

  getPricingTable: async (productUuid: string, options): Promise<ProductPricingTable> => {
    return request(getUrl(`${baseUrl}/${productUuid}/pricingtable`, options as SearchParamOptions), {
      method: 'GET',
    }) as unknown as ProductPricingTable;
  },

  getPlans: async (productUuid: string, options): Promise<Plan[]> => {
    return request(getUrl(`${baseUrl}/${productUuid}/plans`, options as SearchParamOptions), {
      method: 'GET',
    }) as unknown as Plan[];
  },

  getFeatures: async (productUuid: string): Promise<Product> => {
    return request(getUrl(`${baseUrl}/${productUuid}/features`, {}), {
      method: 'GET',
    }) as unknown as Product;
  },

  getCapabilities: async (productUuid: string): Promise<ProductCapability[]> => {
    return request(getUrl(`${baseUrl}/${productUuid}/capabilities`, {}), {
      method: 'GET',
    }) as unknown as ProductCapability[];
  },

  getCurrencies: async (productUuid: string): Promise<ProductCurrency[]> => {
    return request(getUrl(`${baseUrl}/${productUuid}/currencies`, {}), {
      method: 'GET',
    }) as unknown as ProductCurrency[];
  },
});