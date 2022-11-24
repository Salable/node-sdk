import { Base } from '../base';
import { ICountOptions } from '../types';

const resourceName = 'usage';

export default class Usage extends Base {
  updateUsage(
    licenseUuid: string,
    featureVarialbeName: string,
    countOptions: ICountOptions
  ) {
    return this._request(`/${resourceName}`, {
      method: 'PUT',
      body: JSON.stringify({
        licenseUuid,
        featureVarialbeName,
        countOptions,
      }),
    });
  }
}
