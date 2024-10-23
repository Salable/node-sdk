import { ApiRequest, TVersion, Version } from '..';
import { PricingTableResponse } from '../types';
import { v2PricingTableMethods } from './v2';

export type PricingTableVersions = {
  [Version.V2]: {
    /**
     *  Retrieves a pricing table by its UUID. This returns all necessary data on a Pricing Table to be able to display it.
     *
     *  @param {string} pricingTableUuid - The UUID for the pricingTable
     *  @param {{ granteeId?: string; currency?: string;}} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Pricing-Tables/operation/getPricingTableByUuid
     *
     * @returns {Promise<PricingTableResponse>}
     */
    getOne: (pricingTableUuid: string, options?: { granteeId?: string; currency?: string }) => Promise<PricingTableResponse>;
  };
};

export type PricingTableVersionedMethods<V extends TVersion> = V extends keyof PricingTableVersions ? PricingTableVersions[V] : never;

export const PricingTablesInit = <V extends TVersion>(version: V, request: ApiRequest): PricingTableVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2PricingTableMethods(request) as PricingTableVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
