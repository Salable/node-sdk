import { ApiRequest, TVersion, Version } from '..';
import {
  CurrentUsageOptions,
  CurrentUsageRecord,
  GetUsageOptions,
  PaginatedUsageRecords,
  UpdateLicenseUsageOptions
} from '../../src/types';
import { v2UsageMethods } from './v2';

export type UsageVersions = {
  [Version.V2]: {
    /**
     *  Gets all usage records for grantee's metered licenses.
     *
     *  @param {string} granteeId - The granteeId for the licenses
     *  @param {GetUsageOptions} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Usage/operation/getLicenseUsage
     *
     *  @returns {Promise<PaginatedUsageRecords>}
     */
    getAllUsageRecords: (options: GetUsageOptions) => Promise<PaginatedUsageRecords>;
    /**
     *  Gets current usage record for grantee on plan
     *
     *  @param {string} granteeId - The granteeId of the license belongs
     *  @param {string} planUuid - The uuid of the plan the license belongs to
     *
     *  @returns {Promise<{ unitCount: number, updatedAt: string }>}
     */
    getCurrentUsageRecord: (options: CurrentUsageOptions) => Promise<CurrentUsageRecord>;

    /**
     *  Updates a license's usage
     *
     *  @param {string} granteeId - The granteeId of the license belongs
     *  @param {string} planUuid - The uuid of the plan the license belongs to
     *  @param {string} increment - The value to increment the usage on the license.
     *  @param {string} idempotencyKey - A unique key for idempotent requests
     *
     *  @returns {Promise<void>}
     */
    updateLicenseUsage: (params: UpdateLicenseUsageOptions) => Promise<void>;
  };
};

export type UsageVersionedMethods<V extends TVersion> = V extends keyof UsageVersions ? UsageVersions[V] : never;

export const usageInit = <V extends TVersion>(version: V, request: ApiRequest): UsageVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2UsageMethods(request) as UsageVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
