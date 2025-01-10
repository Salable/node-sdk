import { CheckLicenseInput, CheckLicensesCapabilitiesResponse, CreateAdhocLicenseInput, PaginatedLicenses, GetLicenseOptions, License, GetLicenseCountResponse, UpdateManyLicenseInput, GetLicenseCountOptions, GetPurchasersLicensesOptions, ApiRequest, TVersion, Version } from '../types';
import { v2LicenseMethods } from './v2';

export type LicenseVersions = {
  [Version.V2]: {
    /**
     *  Get all licenses
     *
     * @param {GetLicenseOptions} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenses
     *
     * @returns {Promise<PaginatedLicenses>} All licenses present on the account
     */
    getAll: (options?: GetLicenseOptions) => Promise<PaginatedLicenses>;
    /**
     *  Get one license
     *
     *  @param {string} uuid - The UUID of the license
     *  @param {{ expand: string[] }} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid
     *
     *  @returns { Promise<License>}
     */
    getOne: (uuid: string, options?: { expand: string[] }) => Promise<License>;
    /**
     *  Get License's Count
     *
     * @param {GetLicenseCountOptions} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Licenses/operation/getLicensesCount
     *
     * @returns {Promise<GetLicenseCountResponse>}
     */
    getCount: (options?: GetLicenseCountOptions) => Promise<GetLicenseCountResponse>;
    /**
     *  Get Purchasers Licenses
     *
     *  @param {GetPurchasersLicensesOptions} options
     *  @param {GetPurchasersLicensesOptions} options.purchaser - The purchaser of the licenses
     *  @param {GetPurchasersLicensesOptions} options.productUuid - The UUID of the product that the licenses are on
     *  @param {GetPurchasersLicensesOptions} options.status - (Optional) The status of the licenses to filter by
     *
     * @returns {Promise<License[]>}
     */
    getForPurchaser: (options: GetPurchasersLicensesOptions) => Promise<License[]>;
    /**
     *  Get licenses for granteeId
     *
     *  @param {string} granteeId - The granteeId for the licenses
     *  @param {{ expand: string[] }} options - (Optional) Filter parameters. See https://docs.salable.app/api/v2#tag/Licenses/operation/getLicensesByGranteeId
     *
     *  @returns {Promise<License[]>}
     */
    getForGranteeId: (granteeId: string, options?: { expand?: string[] }) => Promise<License[]>;
    /**
     *  Creates a single license with the details provided
     *
     * @param {CreateAdhocLicenseInput} data - The details to create the new license with
     * @param {CreateAdhocLicenseInput} data.planUuid - The UUID of the plan associated with the license. The planUuid can be found on the Plan view in the Salable dashboard
     * @param {CreateAdhocLicenseInput} data.member - The ID of the member who will manage the license.
     * @param {CreateAdhocLicenseInput} data.granteeId - (Optional) The grantee ID for the license.
     * @param {CreateAdhocLicenseInput} data.status - (Optional) The status of the created license, e.g. "ACTIVE" "TRIALING"
     * @param {CreateAdhocLicenseInput} data.endTime - (Optional) Provide a custom end time for the license; this will override the plan's default interval.
     * @param {CreateAdhocLicenseInput} data.cancelAtPeriodEnd - (Optional) If set to true the license will not renew once the endTime date has passed.
     *
     * @returns {Promise<License>} The data for the new license created
     */
    create: (data: CreateAdhocLicenseInput) => Promise<License>;
    /**
     *  Creates many licenses with the details provided
     *
     * @param {CreateAdhocLicenseInput[]} data - The details to create the new license with
     * @param {CreateAdhocLicenseInput[]} data.planUuid - The UUID of the plan associated with the license. The planUuid can be found on the Plan view in the Salable dashboard
     * @param {CreateAdhocLicenseInput[]} data.member - The ID of the member who will manage the license.
     * @param {CreateAdhocLicenseInput[]} data.granteeId - (Optional) The grantee ID for the license.
     * @param {CreateAdhocLicenseInput[]} data.status - (Optional) The status of the created license, e.g. "ACTIVE" "TRIALING"
     * @param {CreateAdhocLicenseInput[]} data.endTime - (Optional) Provide a custom end time for the license; this will override the plan's default interval.
     *
     * @returns {Promise<License[]>} The data for the new license or licenses created
     */
    createMany: (data: CreateAdhocLicenseInput[]) => Promise<License[]>;
    /**
     *  Update a license
     *
     * @param {string} uuid - The UUID of the license
     * @param {{ granteeId?: string; endTime: string;}} data - The value of the new granteeId
     *
     * @returns {Promise<License>} The data of the updated license
     */
    update: (uuid: string, data?: { granteeId: string | null, endTime?: string }) => Promise<License>;
    /**
     *  Update many license's
     *
     * @param {UpdateManyLicenseInput[]} data - The config array of all the licenses you wish to update
     * @param {UpdateManyLicenseInput[]} data.uuid - The UUID of the license to update
     * @param {UpdateManyLicenseInput[]} data.granteeId - The new granteeId of the license
     *
     * @returns {Promise<License[]>} The data of the updated license
     */
    updateMany: (data: UpdateManyLicenseInput[]) => Promise<License[]>;
    /**
     *  Cancel a license
     *
     * @param {string} uuid - The UUID of the license
     *
     * @returns {Promise<void>}
     */
    cancel: (uuid: string) => Promise<void>;
    /**
     *  Cancel many licenses
     *
     * @param {uuids} uuids - Array of license uuids to be canceled
     *
     * @returns {Promise<void>}
     */
    cancelMany: (data: { uuids: string[] }) => Promise<void>;
    /**
     *  Checks a license's capabilities
     *
     * @param {CheckLicenseInput} options
     * @param {CheckLicenseInput} options.productUuid - The UUID of the product to check the license against
     * @param {CheckLicenseInput} options.granteeIds - The grantee IDs to check the license for
     * @param {CheckLicenseInput} options.grace - (Optional) The number of days to extend the end dates of capabilities
     *
     * @returns {Promise<CheckLicensesCapabilitiesResponse>} The capabilities of the license passed
     */
    check: (options: CheckLicenseInput) => Promise<CheckLicensesCapabilitiesResponse>;
    /**
     *  Verifies a license check
     *
     * @param {string} publicKey - The public key belonging to your organisation
     * @param {string} signature - The signature returned from a license check
     * @param {string} payload - The capabilities returned from a license check
     *
     * @returns {boolean} The result of the verification
     */
    verify: (options: { publicKey: string; signature: string; payload: string }) => boolean;
  };
};

export type LicenseVersionedMethods<V extends TVersion> = V extends keyof LicenseVersions ? LicenseVersions[V] : never;

export const licensesInit = <V extends TVersion>(version: V, request: ApiRequest): LicenseVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2LicenseMethods(request) as LicenseVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
