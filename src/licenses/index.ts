import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import {
  ICheckLicensesCapabilities,
  ILicense,
  ICreateAdhocLicenseInput,
  IUpdateLicenseInput,
  IUpdateManyLicenseInput,
  ILicenseCountResponse,
  Status,
  LicenseCancelManyBody,
  LicenseGetByPurchaserOptions,
  LicenseGetUsage,
} from '../types';

/**
 * Salable Node SDK License Class
 *
 * Contains the Salable license methods
 */
export default class Licenses extends Base {
  /**
   *  Get all licenses
   *
   * @returns {Promise<ILicense[]>} All licenses present on the account
   */
  public getAll(): Promise<ILicense[]> {
    return this._request<ILicense[]>(RESOURCE_NAMES.LICENSES);
  }

  /**
   *  Get one license
   *  @param {string} licenseUuid - The UUID of the license
   *
   * @returns {ILicense}
   */
  public getOne(licenseUuid: string): Promise<ILicense> {
    return this._request<ILicense>(`${RESOURCE_NAMES.LICENSES}/${licenseUuid}`);
  }

  /**
   *  Get licenses for purchaser
   *  @param {string} purchaser - The purchaser of the licenses
   *  @param {string} productUuid - The UUID of the product that the licenses are on
   *  @param {LicenseGetByPurchaserOptions} options - (Optional) extra options for filtering or additional data
   *
   * @returns {ILicense[]}
   */
  public getForPurchaser(
    purchaser: string,
    productUuid: string,
    options?: LicenseGetByPurchaserOptions
  ): Promise<ILicense[]> {
    let params = '';
    if (options) {
      if (options.cancelLink) params += '&expand=cancelLink';
      if (options.status) params += `&status=${options.status}`;
    }
    params = encodeURI(params);
    return this._request<ILicense[]>(
      `${RESOURCE_NAMES.LICENSES}/purchaser?purchaser=${purchaser}&productUuid=${productUuid}${params}`
    );
  }

  /**
   *  Get licenses for granteeId
   *  @param {string} granteeId - The granteeId for the licenses
   *
   * @returns {ILicense[]}
   */
  public getForGranteeId(granteeId: string): Promise<ILicense[]> {
    return this._request<ILicense[]>(`${RESOURCE_NAMES.LICENSES}/granteeId/${granteeId}`);
  }

  /**
   *  Get usage on license
   *  @param {string} licenseUuid - The uuid of the license
   *
   * @returns {ILicense[]}
   */
  public getUsage(licenseUuid: string): Promise<LicenseGetUsage[]> {
    return this._request<LicenseGetUsage[]>(`${RESOURCE_NAMES.LICENSES}/${licenseUuid}/usage`);
  }

  /**
   *  Get License's Count
   *
   * @param {string} subscriptionUuid - The uuid of the subscription to filter the license count
   * @param {Status} status - The status of the license to filter by
   *
   * @returns {Promise<ILicenseCountResponse>} The capabilities of the license passed
   */

  public getCount(subscriptionUuid?: string, status?: Status): Promise<ILicenseCountResponse> {
    let url = `${RESOURCE_NAMES.LICENSES}/count`;
    if (subscriptionUuid) {
      url += `?subscriptionUuid=${subscriptionUuid}`;
    }
    if (status) {
      url += `${subscriptionUuid ? '&' : '?'}status=${status}`;
    }
    return this._request<ILicenseCountResponse>(url);
  }

  /**
   *  Checks a license's capabilities
   *
   * @param {string} productUuid - The UUID of the product to check the license against
   * @param {string[]} granteeIds - The grantee IDs to check the license for
   * @param {number} grace - The number of days to extend the end dates of capabilities
   *
   * @returns {Promise<ICheckLicensesCapabilities>} The capabilities of the license passed
   */
  public check(
    productUuid: string,
    granteeIds: string[],
    grace?: number
  ): Promise<ICheckLicensesCapabilities> {
    let params = `productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`;
    if (grace) params += `&grace=${grace}`;
    return this._request<ICheckLicensesCapabilities>(`${RESOURCE_NAMES.LICENSES}/check?${params}`);
  }

  /**
   *  Creates a single license or many licenses with the details provided
   *
   * @param {ICreateAdhocLicenseInput | ICreateAdhocLicenseInput[]} licenseDetails - The details to create the new license with
   *
   * @returns {Promise<ILicense | ILicense[]>} The data for the new license or licenses created
   */

  public create(licenseDetails: ICreateAdhocLicenseInput): Promise<ILicense>;
  public create(licenseDetails: ICreateAdhocLicenseInput[]): Promise<ILicense[]>;
  public create(
    licenseDetails: ICreateAdhocLicenseInput | ICreateAdhocLicenseInput[]
  ): Promise<ILicense | ILicense[]> {
    return this._request<ILicense, ICreateAdhocLicenseInput | ICreateAdhocLicenseInput[]>(
      RESOURCE_NAMES.LICENSES,
      {
        method: 'POST',
        body: licenseDetails,
      }
    );
  }

  /**
   *  Update a license
   *
   * @param {string} licenseUuid - The UUID of the license
   * @param {string} granteeId - The value of the new granteeId
   *
   * @returns {Promise<ILicense>} The data of the updated license
   */
  public update(licenseUuid: string, granteeId: string): Promise<ILicense> {
    return this._request<ILicense, IUpdateLicenseInput>(
      `${RESOURCE_NAMES.LICENSES}/${licenseUuid}`,
      {
        method: 'PUT',
        body: { granteeId },
      }
    );
  }

  /**
   *  Update many license's
   *
   * @param {IUpdateManyLicenseInput[]} updateManyConfig - The config array of all the licenses you wish to update
   *
   * @returns {Promise<ILicense[]>} The data of the updated license
   */
  public updateMany(updateManyConfig: IUpdateManyLicenseInput[]): Promise<ILicense[]> {
    return this._request<ILicense[], IUpdateManyLicenseInput[]>(`${RESOURCE_NAMES.LICENSES}`, {
      method: 'PUT',
      body: updateManyConfig,
    });
  }

  /**
   *  Cancel a license
   *
   * @param {string} licenseUuid - The UUID of the license
   *
   * @returns {Promise<void>}
   */
  public cancel(licenseUuid: string) {
    return this._request<void>(`${RESOURCE_NAMES.LICENSES}/${licenseUuid}`, {
      method: 'DELETE',
    });
  }

  /**
   *  Cancel many licenses
   *
   * @param {string[]} licenseUuids - Array of license uuids to be canceled
   *
   * @returns {Promise<void>}
   */
  public cancelMany(licenseUuids: string[]) {
    return this._request<void, LicenseCancelManyBody>(`${RESOURCE_NAMES.LICENSES}`, {
      method: 'POST',
      body: { uuids: licenseUuids },
    });
  }
}
