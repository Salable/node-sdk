import { ApiRequest, TVersion, Version } from "..";
import { ICheckLicenseInput, ICreateAdhocLicenseInput, IGetLicenseCountInput, IGetPurchasersLicensesInput, ILicense, ILicenseCountResponse, IUpdateManyLicenseInput, LicenseStatus } from "@/src/types";
import { v2LicenseMethods } from "./v2";

// TODO: drop the I from the interfaces
export type LicenseVersions = {
    [Version.V2]: {
        getAll: () => Promise<ILicense[]>,
        getOne: (licenseUuid: string) => Promise<ILicense>,
        getCount: (licenseCountData: IGetLicenseCountInput) => Promise<ILicenseCountResponse>,
        getForPurchaser: (purchaserData: IGetPurchasersLicensesInput) => Promise<ILicense[]>,
        getForGranteeId: ({ granteeId }: { granteeId: string }) => Promise<ILicense[]>,
        create: (licenseData: ICreateAdhocLicenseInput[]) => Promise<ILicense | ILicense[]>,
        update: (licenseUuid: string, { granteeId }: { granteeId: string }) => Promise<ILicense>,
        updateMany: (licenses: IUpdateManyLicenseInput) => Promise<ILicense[]>,
        cancel: (licenseUuid: string) => Promise<void>,
        cancelMany: (licenseUuids: string[]) => Promise<void>,
        check: (checkData: ICheckLicenseInput) => Promise<ICheckLicenseInput>,
        verify: ({ publicKey, signature, payload }: { publicKey: string, signature: string, payload: string }) => boolean;
    };
};

export type LicenseVersionedMethods<V extends TVersion> = V extends keyof LicenseVersions ? LicenseVersions[V] : never;

export const licensesInit = <V extends TVersion>(
    version: V,
    request: ApiRequest
  ): LicenseVersionedMethods<V> => {
    switch (version) {
      case Version.V2:
        return v2LicenseMethods(request) as LicenseVersionedMethods<V>;
      default:
        throw new Error("Unsupported version");
    }
  };