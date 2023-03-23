import { Base } from '../base';
import { ICreateAdhocLicense, ICheckLicensesCapabilities, ILicense } from '../types';

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

  checkLicenses(productUuid: string, granteeIds: string[]): Promise<ICheckLicensesCapabilities> {
    return this._request(
      `/${resourceName}/check?productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`
    );
  }
}
