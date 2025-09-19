import {
  Plan,
  PlanCheckout,
  PlanFeature,
  PlanCapability,
  PlanCurrency,
  TVersion,
  Version,
  GetPlanOptions,
  GetPlanCheckoutOptions,
  GetPlanOptionsV3,
  GetPlanCheckoutOptionsV3,
  GetAllPlansOptionsV3,
  GetAllPlansV3,
} from '../types';

export type PlanVersions = {
  [Version.V2]: {
    /**
     *  Retrieves information about a plan by its UUID. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *
     *  @param {string} planUuid - The UUID of the plan
     *
     * Docs - https://docs.salable.app/api/v2#tag/Plans/operation/getPlanByUuid
     *
     * @returns {Promise<Plan>}
     */
    getOne: (
      planUuid: string,
      options?: GetPlanOptions
    ) => Promise<Plan>;

    /**

    /**
     * Retrieves a checkout link for a specific plan. The checkout link can be used by customers to purchase the plan.
     *
     * @param  {string} planUuid The UUID of the plan
     * @param {GetPlanCheckoutOptions} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Plans/operation/getPlanCheckoutLink
     *
     * @returns {Promise<ProductCapability[]>}
     */
    getCheckoutLink: (
      planUuid: string,
      options: GetPlanCheckoutOptions
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
  [Version.V3]: {
    /**
     *  Get all plans
     *
     * @param GetAllPlansOptionsV3
     *
     *  @returns { Promise<GetAllFeaturesV3>}
     */
    getAll: (options?: GetAllPlansOptionsV3) => Promise<GetAllPlansV3>;
    /**
     *  Retrieves all plans for an organisation with cursor based pagination. The response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` parameter.
     **
     * Docs - https://docs.salable.app/api/v3#tag/Plans/operation/getPlanByUuid
     *
     * @returns {Promise<PlanV3 & {
     *       features?: PlanFeatureV3[];
     *       currencies?: PlanCurrency[];
     *       product?: ProductV3 & { organisationPaymentIntegration: OrganisationPaymentIntegrationV3 }
     *     }>}
     */
    getOne: (
      planUuid: string,
      options?: GetPlanOptionsV3
    ) => Promise<GetAllPlansV3>;

    /**

     /**
     * Retrieves a checkout link for a specific plan. The checkout link can be used by customers to purchase the plan.
     *
     * @param  {string} - planUuid The UUID of the plan
     * @param {GetPlanCheckoutOptions} options - (Optional) Filter parameters. See https://docs.salable.app/api/v3#tag/Plans/operation/getPlanCheckoutLink
     *
     * @returns {Promise<{checkoutUrl: string;}>}
     */
    getCheckoutLink: (
      planUuid: string,
      options: GetPlanCheckoutOptionsV3
    ) => Promise<PlanCheckout>;
  };
};

export type PlanVersionedMethods<V extends TVersion> = V extends keyof PlanVersions ? PlanVersions[V] : never;
