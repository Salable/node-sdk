import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import {
  IPlan,
  IProduct,
  IProductCapabilityResponse,
  IProductCurrencyResponse,
  IProductPricingTableInput,
  IProductPricingTableResponse,
  PricingTableCheckoutKey,
} from '../types';
import defaultParametersCheckoutFactory from '../utils/default-parameters-checkout-factory';

/**
 * Salable Node SDK Product Class
 *
 * Contains the Salable product methods
 */
export default class Products extends Base {
  /**
   *  Get all products
   *
   * @returns {Promise<IProduct[]>} All produdcts
   */
  public getAll(): Promise<IProduct[]> {
    return this._request<IProduct[]>(RESOURCE_NAMES.PRODUCTS);
  }

  /**
   * Get a single product
   *
   * @param  {string} productId The uuid of the product
   *
   * @returns {Promise<IProduct>} The data of the product requested
   */
  public getOne(productId: string): Promise<IProduct> {
    return this._request<IProduct>(`${RESOURCE_NAMES.PRODUCTS}/${productId}`);
  }

  /**
   * Get a pricing table for a product
   *
   * @param  {string} planId The uuid of the plan
   * @param  {string} queryParams The query parameters for the pricing table options
   *
   * @returns {Promise<IProductPricingTableResponse>}
   */

  public getPricingTable(productId: string, queryParams: IProductPricingTableInput) {
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
      flatCheckoutDefaultParams
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

    return this._request<IProductPricingTableResponse>(
      `${RESOURCE_NAMES.PRODUCTS}/${productId}/pricingtable?${query}`
    );
  }

  /**
   * Get all plans for a product
   *
   * @param  {string} productId The uuid of the product
   *
   * @returns {Promise<IPlan[]>} An array of all the associated plans
   */

  public getPlans(productId: string): Promise<IPlan[]> {
    return this._request<IPlan[]>(`${RESOURCE_NAMES.PRODUCTS}/${productId}/plans`);
  }

  /**
   * Get all features for a product
   * d
   * @param  {string} productId The uuid of the product
   *
   * @returns {Promise<IPlan[]>} An array of all the associated features
   */

  public getFeatures(productId: string): Promise<IProduct> {
    return this._request<IProduct>(`${RESOURCE_NAMES.PRODUCTS}/${productId}/features`);
  }

  /**
   * Get all capabilities for a product
   *
   * @param  {string} productId The uuid of the product
   *
   * @returns {Promise<IProductCapabilityResponse[]>}
   */

  public getCapabilities(productId: string) {
    return this._request<IProductCapabilityResponse[]>(
      `${RESOURCE_NAMES.PRODUCTS}/${productId}/capabilities`
    );
  }

  /**
   * Get all currencies for a product
   *
   * @param  {string} productId The uuid of the product
   *
   * @returns {Promise<IProductCurrencyResponse[]>}
   */

  public getCurrencies(productId: string) {
    return this._request<IProductCurrencyResponse[]>(
      `${RESOURCE_NAMES.PRODUCTS}/${productId}/currencies`
    );
  }
}
