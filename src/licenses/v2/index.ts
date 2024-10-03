import { ApiRequest } from "@/src";
import { SALABLE_BASE_URL } from "@/src/constants";
import { ICheckLicenseInput, ICreateAdhocLicenseInput, IGetLicenseCountInput, IGetPurchasersLicensesInput, ILicense, ILicenseCountResponse, IUpdateManyLicenseInput, LicenseStatus } from "@/src/types";
import crypto from 'crypto';
import { LicenseVersions } from "..";

// TODO: expand all objects
//  - verify with OpenApi spec v2
//  - test the typing program
//  - double check the JSDOC
//  - create a dummy v3 to test that versioning works
//  - rm the async, awaits from the request returns (rm asyncs from the types)
//  - use URLSearchParams to fetch query params for endpoints that use them
export const v2LicenseMethods = (request: ApiRequest): LicenseVersions['v2'] => ({
    /**
    *  Get all licenses
    *
    * @returns {Promise<ILicense[]>} All licenses present on the account
    */
    getAll: async (): Promise<ILicense[]> => {
        return request(`${SALABLE_BASE_URL}/licenses`, { method: 'GET' }) as unknown as ILicense[];
    },
    /**
     *  Get one license
     *  @param {string} licenseUuid - The UUID of the license
     *
     * @returns {ILicense}
     */
    getOne: async (licenseUuid: string): Promise<ILicense> => {
        return request(`${SALABLE_BASE_URL}/licenses/${licenseUuid}`, { method: 'GET' }) as unknown as ILicense;
    },
    /**
     *  Get License's Count
     *  @param {IGetLicenseCountInput} licenseCountData
     *  @param {IGetLicenseCountInput} licenseCountData.subscriptionUuid - The UUID of the subscription
     *  @param {IGetLicenseCountInput} licenseCountData.status - The status of the license
     *
     * @returns {ILicenseCountResponse}
     */
    getCount: async (licenseCountData: IGetLicenseCountInput): Promise<ILicenseCountResponse> => {
        let url = `${SALABLE_BASE_URL}/licenses/count`;
        if (licenseCountData.subscriptionUuid) url += `?subscriptionUuid=${licenseCountData.subscriptionUuid}`;
        if (licenseCountData.status) url += `${licenseCountData.subscriptionUuid ? '&' : '?'}status=${licenseCountData.status}`;
        return request(`${SALABLE_BASE_URL}/licenses/count`, { method: 'GET' }) as unknown as ILicenseCountResponse;
    },
    /**
     *  Get Purchasers Licenses
     *  @param {IGetPurchasersLicensesInput} purchaserData
     *  @param {IGetPurchasersLicensesInput} purchaserData.purchaser - The purchaser of the licenses
     *  @param {IGetPurchasersLicensesInput} purchaserData.productUuid - The UUID of the product that the licenses are on
     *  @param {IGetPurchasersLicensesInput} purchaserData.options - (Optional) extra options for filtering or additional data
     *
     * @returns {ILicense[]}
    */
    getForPurchaser: async (purchaserData: IGetPurchasersLicensesInput): Promise<ILicense[]> => {
        let params = '';
        if (purchaserData.options) {
            if (purchaserData.options.cancelLink) params += '&expand=cancelLink';
            if (purchaserData.options.status) params += `&status=${purchaserData.options.status}`;
        }
        params = encodeURI(params);
        return request(`${SALABLE_BASE_URL}/licenses/purchaser?purchaser=${purchaserData.purchaser}&productUuid=${purchaserData.productUuid}${params}`, { method: 'GET' }) as unknown as ILicense[];
    },
    /**
   *  Get licenses for granteeId
   *  @param {string} granteeId - The granteeId for the licenses
   *
   * @returns {ILicense[]}
   */
    getForGranteeId: async ({ granteeId }) => {
        return request(`${SALABLE_BASE_URL}/licenses/granteeId${granteeId}`, { method: 'GET' }) as unknown as ILicense[];
    },
    /**
     *  Creates a single license or many licenses with the details provided
     *
     * @param {ICreateAdhocLicenseInput[]} licenseDetails - The details to create the new license with
     *
     * @returns {Promise<ILicense | ILicense[]>} The data for the new license or licenses created
     */
    create: async (licenseData: ICreateAdhocLicenseInput[]) => {
        return request(`${SALABLE_BASE_URL}/licenses`, { method: 'POST', body: JSON.stringify(licenseData) }) as unknown as ILicense[];
    },
    /**
   *  Update a license
   *
   * @param {string} licenseUuid - The UUID of the license
   * @param {{granteeId: string}} granteeId - The value of the new granteeId
   *
   * @returns {Promise<ILicense>} The data of the updated license
   */
    update: async (licenseUuid: string, granteeId: { granteeId: string }): Promise<ILicense> => {
        return  request(`${SALABLE_BASE_URL}/licenses/${licenseUuid}`, { method: 'PUT', body: JSON.stringify(granteeId) }) as unknown as ILicense;
    },
    /**
   *  Update many license's
   *
   * @param {IUpdateManyLicenseInput[]} licenses - The config array of all the licenses you wish to update
   *
   * @returns {Promise<ILicense[]>} The data of the updated license
   */
    updateMany: async (licenses: IUpdateManyLicenseInput): Promise<ILicense[]> => {
        return await request(`${SALABLE_BASE_URL}/licenses`, { method: 'PUT', body: JSON.stringify(licenses) }) as unknown as ILicense[];
    },
    /**
     *  Cancel a license
     *
     * @param {string} licenseUuid - The UUID of the license
     *
     * @returns {Promise<void>}
     */
    cancel: async (licenseUuid: string): Promise<void> => {
        return await request(`${SALABLE_BASE_URL}/licenses/${licenseUuid}`, { method: 'DELETE' }) as unknown as void;
    },
    /**
     *  Cancel many licenses
     *
     * @param {string[]} licenseUuids - Array of license uuids to be canceled
     *
     * @returns {Promise<void>}
     */
    cancelMany: async (licenseUuids: string[]): Promise<void> => {
        return await request(`${SALABLE_BASE_URL}/licenses/cancel`, { method: 'POST', body: JSON.stringify(licenseUuids) }) as unknown as void;
    },
    /**
   *  Checks a license's capabilities
   *
   * @param {string} productUuid - The UUID of the product to check the license against
   * @param {string[]} granteeIds - The grantee IDs to check the license for
   * @param {number} grace - The number of days to extend the end dates of capabilities
   *
   * @returns {Promise<ICheckLicensesCapabilities>} The capabilities of the license passed
   */
    check: async ({ productUuid, granteeIds, grace }: ICheckLicenseInput) => {
        let params = `productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`;
        if (grace) params += `&grace=${grace}`;
        return await request(`${SALABLE_BASE_URL}/licenses/check${params}`, { method: 'GET' }) as unknown as ICheckLicenseInput;
    },
    /**
   *  Verifies a license check
   *
   * @param {string} publicKey - The public key belonging to your organisation
   * @param {string} signature - The signature returned from a license check
   * @param {string} payload - The capabilities returned from a license check
   *
   * @returns {boolean} The result of the verification
   */
    verify: ({ publicKey, signature, payload }: { publicKey: string, signature: string, payload: string }): boolean => {
        const verify = crypto.createVerify('sha256');
        verify.write(payload);
        verify.end();
        return verify.verify(publicKey, signature, 'hex');
    }
});