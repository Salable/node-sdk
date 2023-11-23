import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import {
  PricingTableParameters,
  IProductPricingTableResponse,
  PricingTableCheckoutKey,
} from '../types';
import defaultParametersCheckoutFactory from '../utils/default-parameters-checkout-factory';

/**
 * Salable Node SDK Product Class
 *
 * Contains the Salable pricing table methods
 */
export default class PricingTables extends Base {
  /**
   * Get a single pricing table
   *
   * @param  {string} pricingTableId The uuid of the pricing table
   *
   * @returns {Promise<IProduct>} The data of the product requested
   */

  public getOne(pricingTableId: string, queryParams: PricingTableParameters) {
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
      `${RESOURCE_NAMES.PRICING_TABLES}/${pricingTableId}?${query}`
    );
  }
}
