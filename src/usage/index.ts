import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import { IUsageUpdateCountOptions, IUsageUpdateInput } from '../types';
import { v4 as uuidV4 } from 'uuid';

/**
 * Salable Node SDK Usage Class
 *
 * Contains the Salable usage methods
 */
export default class Usage extends Base {
  /**
   * Update a plan's usage
   *
   * @param  {string} licenseUuid The uuid of the license
   * @param  {string} featureVariableName The variable name of the feature
   * @param {IUsageUpdateCountOptions} countOptions - The number to increment the usage of the plan by
   *
   * @returns {Promise<void>}
   */
  public update(
    licenseUuid: string,
    featureVariableName: string,
    countOptions: IUsageUpdateCountOptions
  ) {
    return this._request<void, IUsageUpdateInput>(RESOURCE_NAMES.USAGE, {
      method: 'PUT',
      headers: {
        'unique-key': uuidV4(),
      },
      body: {
        licenseUuid,
        featureVariableName,
        countOptions,
      },
    });
  }
}
