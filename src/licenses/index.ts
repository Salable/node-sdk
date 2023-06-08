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
  public getAll({ status }: { status?: IStatus } = {}): Promise<ILicense[] | undefined> {
    return this._request<ILicense[]>(
      `${RESOURCE_NAMES.LICENSES}${status ? `?status=${status}` : ''}`
    );
  }

  /**
   *  Get a single license
   *
   * @param {string} uuid - The UUID of the license to retrieve
   *
   * @returns {Promise<ILicense>} The license associated with the UUID passed in
   */
  public getOne(uuid: string): Promise<ILicense | undefined> {
    return this._request<ILicense>(`${RESOURCE_NAMES.LICENSES}/${uuid}`);
  }

  /**
   *  Creates a new license with the details provided
   *
   * @param {ICreateAdhocLicenseInput} licenseDetails - The details to create the new license with
   *
   * @returns {Promise<ILicense >} The data for the new license
   */
  public create(licenseDetails: ICreateAdhocLicenseInput): Promise<ILicense | undefined> {
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
  public check(
    productUuid: string,
    granteeIds: string[]
  ): Promise<ICheckLicensesCapabilities | undefined> {
    if (!productUuid && !Array.isArray(granteeIds)) {
      throw new Error('Bad Request: "productUuid" and "granteeIds" cannot be undefined');
    }

    if (!productUuid) {
      throw new Error('Bad Request: "productUuid" cannot be undefined');
    }

    if (!Array.isArray(granteeIds)) {
      throw new Error('Bad Request: Passed "granteeIds" are not valid, must be of type String[]');
    }

    return this._request<ICheckLicensesCapabilities>(
      `${
        RESOURCE_NAMES.LICENSES
      }/check?productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`
    );
  }

  /**
   *  Delete a license
   *
   * @param {string} uuid - The UUID of the license to delete
   *
   * @returns {Promise<void>}
   */
  public delete(uuid: string): Promise<void> {
    return this._request<void>(`${RESOURCE_NAMES.LICENSES}/${uuid}`, {
      method: 'DELETE',
    });
  }
}
