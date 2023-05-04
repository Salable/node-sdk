import { Base } from '../base';
import { ICountOptions } from '../types';
import { v4 as uuidV4 } from 'uuid';

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
      headers: {
        'unique-key': uuidV4(),
      },
      body: JSON.stringify({
        licenseUuid,
        featureVariableName,
        countOptions,
      }),
    });
  }
}
