import { ApiRequest, TVersion, Version } from '..';
import {
  Plan,
  PlanCheckout,
  PlanFeature,
  PlanCapability,
  PlanCurrency,
} from '../types';
import { v2PlanMethods } from './v2';

export type PlanVersions = {
  [Version.V2]: {
    /**
     *  Retrieves information about a plan by its UUID. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *
     *  @param {string} planUuid - The UUID of the plan
     *
     * Docs - https://docs.salable.app/api/v2#tag/Plans/operation/getPlanByUuid
     *
     * @returns {Promise<IPlan>}
     */
    getOne: (
      planUuid: string,
      options?: {
        expand?: string[];
      },
    ) => Promise<Plan>;

    /**
     * Retrieves a checkout link for a specific plan. The checkout link can be used by customers to purchase the plan.
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * Docs - https://docs.salable.app/api/v2#tag/Plans/operation/getPlanCheckoutLink
     *
     * @returns {Promise<PlanCheckout>}
     */
    getCheckoutLink: (
      planUuid: string,
      options: {
        successUrl: string;
        cancelUrl: string;
        granteeId: string;
        member: string;
        promoCode?: string;
        allowPromoCode?: boolean;
        customerEmail?: string;
        customerId?: string;
        currency?: string;
        automaticTax?: string;
        quantity?: string;
        changeQuantity?: string;
        requirePaymentMethod?: 'true' | 'false';
      },
    ) => Promise<PlanCheckout>;

    /**
     * Retrieve the list of features for a specific plan
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * Docs - https://docs.salable.app/api/v2#tag/Plans/operation/getPlanFeatures
     *
     * @returns {Promise<PlanFeature[]>}
     */
    getFeatures: (planUuid: string) => Promise<PlanFeature[]>;

    /**
     * Retrieve the list of capabilities for a specific plan
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * Docs - https://docs.salable.app/api/v2#tag/Plans/operation/getPlanCapabilities
     *
     * @returns {Promise<PlanCapability[]>}
     */
    getCapabilities: (planUuid: string) => Promise<PlanCapability[]>;

    /**
     * Retrieve the list of currencies for a specific plan
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * Docs - https://docs.salable.app/api/v2#tag/Plans/operation/getPlanCurrencies
     *
     * @returns {Promise<PlanCurrency[]>}
     */
    getCurrencies: (planUuid: string) => Promise<PlanCurrency[]>;
  };
};

export type PlanVersionedMethods<V extends TVersion> = V extends keyof PlanVersions
  ? PlanVersions[V]
  : never;

export const PlansInit = <V extends TVersion>(
  version: V,
  request: ApiRequest,
): PlanVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2PlanMethods(request) as PlanVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
