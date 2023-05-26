import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import { IPlan, IProduct, IProductPricingTableInput } from '../types';

/**
 * Salable Node SDK Product Class
 *
 * Contains the Salable product methods
 */
export default class Products extends Base {
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
   * @returns {Promise<IPlanCheckoutResponse>}
   */

  public getPricingTable(
    productId: string,
    queryParams: IProductPricingTableInput
  ): Promise<IProduct> {
    const {
      globalPlanOptions: { granteeId, successUrl, cancelUrl, member },
    } = queryParams;

    const granteeIdsWithHashes = queryParams.individualPlanOptions
      ? Object.keys(queryParams.individualPlanOptions)?.map((key) => {
          const granteeId =
            queryParams?.individualPlanOptions?.[key]?.granteeId ??
            queryParams.globalPlanOptions.granteeId;
          return `${key},${granteeId}`;
        })
      : [];

    const successUrlsWithHashes = queryParams.individualPlanOptions
      ? Object.keys(queryParams.individualPlanOptions)?.map((key) => {
          const successUrl =
            queryParams?.individualPlanOptions?.[key]?.successUrl ??
            queryParams.globalPlanOptions.successUrl;
          return `${key},${successUrl}`;
        })
      : [];

    const cancelUrlsWithHashes = queryParams.individualPlanOptions
      ? Object.keys(queryParams.individualPlanOptions)?.map((key) => {
          const cancelUrl =
            queryParams?.individualPlanOptions?.[key]?.cancelUrl ??
            queryParams.globalPlanOptions.cancelUrl;
          return `${key},${cancelUrl}`;
        })
      : [];

    // console.log(granteeIdsWithHashes, 'granteeIdsWithHashes');
    // console.log(successUrlsWithHashes, 'successUrlsWithHashes');
    // console.log(cancelUrlsWithHashes, 'cancelUrlsWithHashes');

    const query = encodeURI(
      `globalGranteeId=${granteeId}&granteeIds=[${granteeIdsWithHashes.toString()}]&globalSuccessUrl=${successUrl}&successUrls=[${successUrlsWithHashes.toString()}]&globalCancelUrl=${cancelUrl}&cancelUrls=[${cancelUrlsWithHashes.toString()}]&member=${member}`
    );

    // TODO: Add checkoutConfig options

    return this._request<IProduct>(`${RESOURCE_NAMES.PRODUCTS}/${productId}/pricingtable?${query}`);
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
   *
   * @param  {string} productId The uuid of the product
   *
   * @returns {Promise<IPlan[]>} An array of all the associated features
   */

  public getFeatures(productId: string): Promise<IProduct> {
    return this._request<IProduct>(`${RESOURCE_NAMES.PRODUCTS}/${productId}/features`);
  }
}

// for global, success, cancel,member and grantee are required,

// for individual, optionally pass in grantee, success or cancel
