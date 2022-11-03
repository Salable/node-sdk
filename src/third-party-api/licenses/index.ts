import { ICreateAdhocLicense, ILicense } from "../types";
import { RequestBase } from "../request-base";

const resourceName = "licenses";

export default class Licenses extends RequestBase {
  getLicenses(): Promise<ILicense[]> {
    return this.request(`/${resourceName}`);
  }

  createLicense(newLicense: ICreateAdhocLicense): Promise<ILicense> {
    return this.request(`/${resourceName}`, {
      method: "POST",
      body: JSON.stringify(newLicense),
    });
  }

  checkLicenses(productUuid: string, granteeIds: string[]): Promise<ILicense> {
    return this.request(
      `/${resourceName}/check?productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`
    );
  }
}
