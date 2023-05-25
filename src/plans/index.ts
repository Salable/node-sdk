import { Base } from '../base';
import { RESOURCE_NAMES, allowedPlanCheckoutParams } from '../constants';
import {
  IPlan,
  IPlanCapabilityResponse,
  IPlanCheckoutInputParams,
  IPlanCheckoutResponse,
  IPlanCurrencyResponse,
  IPlanFeatureResponse,
  PlanCheckoutKey,
} from '../types';
import planCheckoutFactory from '../utils/plan-checkout-factory';

/**
 * Salable Node SDK Plan Class
 *
 * Contains the Salable plsn methods
 */
export default class Plans extends Base {
  /**
   * Get a single plan
   *
   * @param  {string} planId The uuid of the plan
   *
   * @returns {Promise<IPlan>} The data of the subscription requested
   */
  public getOne(planId: string): Promise<IPlan> {
    return this._request<IPlan>(`${RESOURCE_NAMES.PLANS}/${planId}`);
  }

  /**
   * Get a plan's checkout link
   *
   * @param  {string} planId The uuid of the plan
   * @param  {string} queryParams The query parameters for the checkout options
   *
   * @returns {Promise<IPlanCheckoutResponse>}
   */

  public getCheckoutLink(
    planId: string,
    queryParams: IPlanCheckoutInputParams
  ): Promise<IPlanCheckoutResponse> {
    const encodedParams = new URLSearchParams();

    const flatCheckoutParams = planCheckoutFactory(queryParams);

    for (const key of Object.keys(queryParams)) {
      const itemKey = key as PlanCheckoutKey;
      const itemValue = flatCheckoutParams[itemKey];
      if (itemValue && allowedPlanCheckoutParams.includes(itemKey))
        encodedParams.set(itemKey, itemValue);
    }

    return this._request<IPlanCheckoutResponse>(
      `${RESOURCE_NAMES.PLANS}/${planId}/checkoutlink?${encodedParams.toString()}`
    );
  }

  /**
   * Get a plan's features
   *
   * @param  {string} planId The uuid of the plan
   *
   * @returns {Promise<IPlanFeatureResponse[]>}
   */

  public getFeatures(planId: string) {
    return this._request<IPlanFeatureResponse[]>(`${RESOURCE_NAMES.PLANS}/${planId}/features`);
  }

  /**
   * Get a plan's capabilities
   *
   * @param  {string} planId The uuid of the plan
   *
   * @returns {Promise<IPlanCapabilityResponse[]>}
   */

  public getCapabilities(planId: string) {
    return this._request<IPlanCapabilityResponse[]>(
      `${RESOURCE_NAMES.PLANS}/${planId}/capabilities`
    );
  }

  /**
   * Get a plan's currencies
   *
   * @param  {string} planId The uuid of the plan
   *
   * @returns {Promise<IPlanCurrencyResponse[]>}
   */

  public getCurrencies(planId: string) {
    return this._request<IPlanCurrencyResponse[]>(`${RESOURCE_NAMES.PLANS}/${planId}/currencies`);
  }
}
