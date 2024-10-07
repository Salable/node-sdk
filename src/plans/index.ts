import { ApiRequest, TVersion, Version } from '..';
import {
  PlanCheckoutInputParams,
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
     *  Get a single plan
     *
     *  @param {string} planUuid - The UUID of the plan
     *
     * @returns {Promise<IPlan>}
     */
    getOne: (planUuid: string) => Promise<Plan>;

    /**
     * Get a plan's checkout link
     *
     * @param  {string} planUuid The UUID of the plan
     * @param  {string} queryParams The query parameters for the checkout options
     *
     * @returns {Promise<PlanCheckout>}
     */
    getCheckoutLink: (
      planUuid: string,
      queryParams: PlanCheckoutInputParams,
    ) => Promise<PlanCheckout>;

    /**
     * Get a plan's features
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * @returns {Promise<IPlanFeature[]>}
     */
    getFeatures: (planUuid: string) => Promise<PlanFeature[]>;

    /**
     * Get a plan's capabilities
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * @returns {Promise<PlanCapability[]>}
     */
    getCapabilities: (planUuid: string) => Promise<PlanCapability[]>;

    /**
     * Get a plan's currencies
     *
     * @param  {string} planUuid The UUID of the plan
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
