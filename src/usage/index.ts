import { ApiRequest, TVersion, Version } from '..';
import { GetUsageOptions, GetAllUsageRecordsResponse } from '../../src/types';
import { v2UsageMethods } from './v2';

export type UsageVersions = {
  [Version.V2]: {
    /**
     *  Gets all usage records for grantee's metered licenses.
     *
     *  @param {string} granteeId - The granteeId for the licenses
     *  @param {GetUsageOptions} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Usage/operation/getLicenseUsage
     *
     *  @returns {Promise<GetAllUsageRecordsResponse[]>}
     */
    getAllUsageRecords: (granteeId: string, options?: GetUsageOptions) => Promise<GetAllUsageRecordsResponse[]>;
    /**
     *  Gets current usage record for grantee on plan
     *
     *  @param {string} granteeId - The granteeId of the license belongs
     *  @param {string} planUuid - The uuid of the plan the license belongs to
     *
     *  @returns {Promise<{ unitCount: number, updatedAt: string }>}
     */
    getCurrentUsageRecord: (granteeId: string, planUuid: string) => Promise<{ unitCount: number, updatedAt: string }>;

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
    updateLicenseUsage: (granteeId: string, planUuid: string, increment: number, idempotencyKey: string) => Promise<void>;
  }
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
