import { PricingTable, TVersion, Version, PricingTableV3 } from '../types';

export type PricingTableVersions = {
  [Version.V2]: {
    /**
     *  Retrieves a pricing table by its UUID. This returns all necessary data on a Pricing Table to be able to display it.
     *
     *  @param {string} pricingTableUuid - The UUID for the pricingTable
     *  @param {{ granteeId?: string; currency?: string;}} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Pricing-Tables/operation/getPricingTableByUuid
     *
     * @returns {Promise<PricingTable>}
     */
    getOne: (pricingTableUuid: string, options?: { granteeId?: string; currency?: string }) => Promise<PricingTable>;
  };
  [Version.V3]: {
    /**
     *  Retrieves a pricing table by its UUID. This returns all necessary data on a Pricing Table to be able to display it.
     *
     *  @param {string} pricingTableUuid - The UUID for the pricingTable
     *  @param {{ granteeId?: string; currency?: string;}} options - (Optional) Filter parameters. See https://docs.salable.app/api/v3#tag/Pricing-Tables/operation/getPricingTableByUuid
     *
     * @returns {Promise<PricingTable>}
     */
    getOne: (pricingTableUuid: string, options: { owner: string; currency?: string }) => Promise<PricingTableV3>;
  };
};

export type PricingTableVersionedMethods<V extends TVersion> = V extends keyof PricingTableVersions ? PricingTableVersions[V] : never;