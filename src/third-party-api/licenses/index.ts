import { Base } from '../base';
import { ICreateAdhocLicense, ILicense } from '../types';

const resourceName = 'licenses';

export default class Licenses extends Base {
  getLicenses(): Promise<ILicense[]> {
    return this._request(`/${resourceName}`);
  }

  createLicense(newLicense: ICreateAdhocLicense): Promise<ILicense> {
    return this._request(`/${resourceName}`, {
      method: 'POST',
      body: JSON.stringify(newLicense),
    });
  }
}
