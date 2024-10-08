import { ApiRequest, TVersion, Version } from '..';
import { PricingTableOptions, Product } from '../types';
import { v2PricingTableMethods } from './v2';

export type PricingTableVersions = {
  [Version.V2]: {
    /**
     *  Get a single pricing table
     *  @param {string} pricingTableUuid - The UUID of the pricing table
     *
     * @returns {Promise<Product>} The data of the product requested
     */
    getOne: (pricingTableUuid: string, options: PricingTableOptions) => Promise<Product>;
  };
};

export type PricingTableVersionedMethods<V extends TVersion> = V extends keyof PricingTableVersions
    ? PricingTableVersions[V]
    : never;

export const PricingTablesInit = <V extends TVersion>(
    version: V,
    request: ApiRequest,
): PricingTableVersionedMethods<V> => {
    switch (version) {
        case Version.V2:
            return v2PricingTableMethods(request) as PricingTableVersionedMethods<V>;
        default:
            throw new Error('Unsupported version');
    }
};
