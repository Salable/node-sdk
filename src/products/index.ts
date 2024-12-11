import { Plan, Product, ProductCapability, ProductCurrency, ProductFeature, ProductPricingTable, ApiRequest, TVersion, Version } from '../types';
import { v2ProductMethods } from './v2';

export type ProductVersions = {
  [Version.V2]: {
    /**
     *  Retrieves a list of all products
     *
     * Docs - https://docs.salable.app/api/v2#tag/Products/operation/getProducts
     *
     * @returns {Promise<Product[]>} All products present on the account
     */
    getAll: () => Promise<Product[]>;

    /**
     *  Retrieves a specific product by its UUID. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *
     *  @param {string} productUuid - The UUID for the pricingTable
     *  @param {{ expand: string[]}} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Products/operation/getProductByUuid
     *
     * @returns {Promise<Product>}
     */
    getOne: (productUuid: string, options?: { expand: string[] }) => Promise<Product>;

    /**
     *  Retrieves all the plans associated with a specific product. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the expand query parameter.
     *
     *  @param {string} productUuid - The UUID for the pricingTable
     *  @param {{ granteeId?: string; currency?: string }} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Products/operation/getProductPricingTable
     *
     * @returns {Promise<ProductPricingTable>}
     */
    getPricingTable: (productUuid: string, options?: { granteeId?: string; currency?: string }) => Promise<ProductPricingTable>;

    /**
     * Retrieves all the plans associated with a specific product. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *
     * @param  {string} productUuid The uuid of the product
     *
     * Docs - https://docs.salable.app/api/v2#tag/Products/operation/getProductPlans
     *
     * @returns {Promise<IPlan[]>} An array of all the associated plans
     */
    getPlans(productUuid: string): Promise<Plan[]>;

    /**
     * Retrieve the list of features for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * Docs - https://docs.salable.app/api/v2#tag/Products/operation/getProductFeatures
     *
     * @returns {Promise<ProductFeature>} An array of all the associated features
     */
    getFeatures(productUuid: string): Promise<ProductFeature>;

    /**
     * Retrieve the list of capabilities for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * Docs - https://docs.salable.app/api/v2#tag/Products/operation/getProductCapabilities
     *
     * @returns {Promise<ProductCapability[]>}
     */
    getCapabilities(productUuid: string): Promise<ProductCapability[]>;

    /**
     * Retrieve the list of currencies for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * Docs - https://docs.salable.app/api/v2#tag/Products/operation/getProductCurrencies
     *
     * @returns {Promise<ProductCurrency[]>}
     */
    getCurrencies(productUuid: string): Promise<ProductCurrency[]>;
  };
};

export type ProductVersionedMethods<V extends TVersion> = V extends keyof ProductVersions ? ProductVersions[V] : never;

export const productsInit = <V extends TVersion>(version: V, request: ApiRequest): ProductVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2ProductMethods(request) as ProductVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
