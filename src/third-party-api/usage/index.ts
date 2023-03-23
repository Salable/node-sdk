import { Base } from '../base';
import { ICountOptions } from '../types';

const resourceName = 'usage';

/**
 * Salable Third Party API Usage Class
 *
 * Contains the Salable Third Party API usage methods
 */

export default class Usage extends Base {
  /**
   * Update a plan's usage
   *
   * @param  {string} licenseUuid `the uuid of the license`
   * @param  {string} featureVariableName `the variable name of the feature`
   * @param {ICountOptions} countOptions
   */
  updateUsage(licenseUuid: string, featureVariableName: string, countOptions: ICountOptions) {
    return this._request(`/${resourceName}`, {
      method: 'PUT',
      body: JSON.stringify({
        licenseUuid,
        featureVariableName,
        countOptions,
      }),
    });
  }
}
