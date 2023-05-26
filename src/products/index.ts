import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import {
  IPlan,
  IProduct,
  IProductPricingTableInput,
  IProductPricingTableResponse,
  PlanCheckoutKey,
} from '../types';
import planCheckoutFactory from '../utils/plan-checkout-factory';

const allowedQueryParams = [
  'customerCountry',
  'customerEmail',
  'customerPostcode',
  'member',
  'promoCode',
  'allowPromoCode',
  'marketingConsent',
  'vatCity',
  'vatCompanyName',
  'vatCountry',
  'vatNumber',
  'vatPostcode',
  'vatState',
  'vatStreet',
];

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
   * @returns {Promise<IProductPricingTableResponse>}
   */

  public getPricingTable(productId: string, queryParams: IProductPricingTableInput) {
    const {
      globalPlanOptions: { granteeId, successUrl, cancelUrl },
    } = queryParams;

    const flatCheckoutParams = planCheckoutFactory(queryParams.globalPlanOptions);

    let paramsStr = '';

    for (const key of Object.keys(flatCheckoutParams)) {
      const itemKey = key as PlanCheckoutKey;
      const itemValue = flatCheckoutParams[itemKey];
      if (itemValue && allowedQueryParams.includes(itemKey)) {
        paramsStr += `&${itemKey}=${itemValue}`;
      }
    }

    const { cancelUrls, successUrls, granteeIds } = queryParams.individualPlanOptions
      ? Object.keys(queryParams.individualPlanOptions)?.reduce<{
          cancelUrls: string[];
          successUrls: string[];
          granteeIds: string[];
        }>(
          (acc, cur) => {
            // acc: current value
            // cur: current array item we're on
            const cancelUrl =
              queryParams?.individualPlanOptions?.[cur]?.cancelUrl ??
              queryParams.globalPlanOptions.cancelUrl;

            const successUrl =
              queryParams?.individualPlanOptions?.[cur]?.successUrl ??
              queryParams.globalPlanOptions.successUrl;

            const granteeId =
              queryParams?.individualPlanOptions?.[cur]?.granteeId ??
              queryParams.globalPlanOptions.granteeId;

            acc.cancelUrls.push(`${cur},${cancelUrl}`);
            acc.successUrls.push(`${cur},${successUrl}`);
            acc.granteeIds.push(`${cur},${granteeId}`);

            return acc;
          },
          {
            cancelUrls: [],
            successUrls: [],
            granteeIds: [],
          }
        )
      : {
          cancelUrls: [],
          successUrls: [],
          granteeIds: [],
        };

    const query = encodeURI(
      `globalGranteeId=${granteeId}&granteeIds=[${granteeIds.toString()}]&globalSuccessUrl=${successUrl}&successUrls=[${successUrls.toString()}]&globalCancelUrl=${cancelUrl}&cancelUrls=[${cancelUrls.toString()}]${paramsStr}`
    );

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
}

// for global, success, cancel,member and grantee are required,

// for individual, optionally pass in grantee, success or cancel
