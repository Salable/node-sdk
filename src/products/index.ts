import { ApiRequest, TVersion, Version } from ".."
import {
  IPlan,
  IProduct,
  IProductCapability,
  IProductCurrency,
  IProductPricingTable,
  PricingTableParameters,
} from '../types';
import { v2ProductMethods } from "./v2";


export type ProductVersions = {
  [Version.V2]: {
    /**
     *  Get all products
     *
     * @returns {Promise<IProduct[]>} All products present on the account
     */
    getAll: () => Promise<IProduct[]>;

    /**
     *  Get one product
     *  @param {string} productUuid - The UUID of the product
     *
     * @returns {Promise<IProduct>}
     */
    getOne: (productUuid: string) => Promise<IProduct>;

    /**
     *  Get a pricing table for a product
     *  @param {string} productUuid - The UUID of the product
     *  @param {string} queryParams - The query parameters for a pricing table options
     *
     * @returns {Promise<IProductPricingTable>}
     */
    getPricingTable: (
      productUuid: string,
      options: PricingTableParameters,
    ) => Promise<IProductPricingTable>;

    /**
     * Get all plans for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * @returns {Promise<IPlan[]>} An array of all the associated plans
     */
    getPlans(productUuid: string): Promise<IPlan[]>;

    /**
     * Get all features for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * @returns {Promise<IProduct>} An array of all the associated features
     */
    getFeatures(productUuid: string): Promise<IProduct>;

    /**
     * Get all capabilities for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * @returns {Promise<IProductCapability[]>}
     */
    getCapabilities(productUuid: string): Promise<IProductCapability[]>;

    /**
     * Get all currencies for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * @returns {Promise<IProductCurrency[]>}
     */
    getCurrencies(productUuid: string): Promise<IProductCurrency[]>;
  };
};

export type ProductVersionedMethods<V extends TVersion> = V extends keyof ProductVersions ? ProductVersions[V] : never;

export const ProductsInit = <V extends TVersion>(version: V, request: ApiRequest): ProductVersionedMethods<V> => {
    switch (version) {
        case Version.V2:
            return v2ProductMethods(request) as ProductVersionedMethods<V>;
        default:
            throw new Error("Unsupported version")
    }
}