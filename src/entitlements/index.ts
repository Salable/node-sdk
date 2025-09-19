import { TVersion, Version, EntitlementCheck } from '../types';

export type EntitlementVersions = {
  [Version.V3]: {
    /**
     *  Check entitlements
     *
     *  @param {string[]} granteeIds - The UUIDs of the grantee to be checked
     *  @param {string} productUuid - The UUID of the product to be checked
     *
     *  @returns { Promise<EntitlementCheck>}
     */
    check: (options: {
      granteeIds: string[],
      productUuid: string
    }) => Promise<EntitlementCheck>;
  };
};

export type EntitlementVersionedMethods<V extends TVersion> = V extends keyof EntitlementVersions ? EntitlementVersions[V] : never;