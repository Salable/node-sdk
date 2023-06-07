import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import { ICheckLicensesCapabilities, ILicense, ICreateAdhocLicenseInput, IStatus } from '../types';

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
  public getAll({ status }: { status?: IStatus } = {}): Promise<ILicense[]> {
    return this._request<ILicense[]>(
      `${RESOURCE_NAMES.LICENSES}${status ? `?status=${status}` : ''}`
    );
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

  // TODO: add delete method
}
