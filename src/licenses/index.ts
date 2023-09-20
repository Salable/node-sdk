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
   *  Creates a new license with the details provided
   *
   * @param {ICreateAdhocLicenseInput} licenseDetails - The details to create the new license with
   *
   * @returns {Promise<ILicense>} The data for the new license
   */
  public create(licenseDetails: ICreateAdhocLicenseInput): Promise<ILicense> {
    return this._request<ILicense, ICreateAdhocLicenseInput>(RESOURCE_NAMES.LICENSES, {
      method: 'POST',
      body: licenseDetails,
    });
  }

  /**
   *  Checks a license's capabilities
   *
   * @param {string} productUuid - The UUID of the product to check the license against
   * @param {string[]} granteeIds - The grantee IDs to check the license for
   *
   * @returns {Promise<ICheckLicensesCapabilities>} The capabilities of the license passed
   */
  public check(productUuid: string, granteeIds: string[]): Promise<ICheckLicensesCapabilities> {
    return this._request<ICheckLicensesCapabilities>(
      `${
        RESOURCE_NAMES.LICENSES
      }/check?productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`
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
        body: {
          granteeId,
        },
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
   *  Get License's Count
   *
   * @param {string} subscriptionUuid - The uuid of the subscription to filter the license count too
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
}
