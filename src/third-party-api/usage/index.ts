import { Base } from '../base';
import { ICountOptions } from '../types';

const resourceName = 'usage';

export default class Usage extends Base {
  updateUsage(
    licenseUuid: string,
    featureVariableName: string,
    countOptions: ICountOptions
  ) {
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
