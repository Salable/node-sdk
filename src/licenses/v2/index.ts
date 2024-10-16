import { ApiRequest } from "../../../src";
import { SALABLE_BASE_URL } from "../../../src/constants";
import { CheckLicensesCapabilitiesResponse, License, GetLicenseCountResponse, GetAllLicensesResponse, SearchParamOptions } from "@/src/types";
import crypto from 'crypto';
import { LicenseVersions } from "..";
import getUrl from "../../../src/utils/get-url";

const baseUrl = `${SALABLE_BASE_URL}/licenses`;

export const v2LicenseMethods = (request: ApiRequest): LicenseVersions['v2'] => ({
    getAll: (options) => request(getUrl(baseUrl, options as SearchParamOptions), { method: 'GET' }) as unknown as Promise<GetAllLicensesResponse>,
    getOne: (licenseUuid, options) => request(getUrl(`${baseUrl}/${licenseUuid}`, options as SearchParamOptions), { method: 'GET' }) as unknown as Promise<License>,
    getCount: ({ subscriptionUuid, status }) => request(getUrl(`${baseUrl}/count`, { subscriptionUuid, status }), { method: 'GET' }) as unknown as Promise<GetLicenseCountResponse>,
    getForPurchaser: (purchaserData) => request(getUrl(`${baseUrl}/purchaser`, purchaserData as unknown as SearchParamOptions), { method: 'GET' }) as unknown as Promise<License[]>,
    getForGranteeId: ({ granteeId }, options) => request(getUrl(`${baseUrl}/granteeId${granteeId}`, options as SearchParamOptions), { method: 'GET' }) as unknown as Promise<License[]>,
    create: (licenseData) => request(baseUrl, { method: 'POST', body: JSON.stringify(licenseData) }) as unknown as Promise<License[]>,
    update: (licenseUuid, data) => request(`${baseUrl}/${licenseUuid}`, { method: 'PUT', body: JSON.stringify(data) }) as unknown as Promise<License>,
    updateMany: (licenses) => request(baseUrl, { method: 'PUT', body: JSON.stringify(licenses) }) as unknown as Promise<License[]>,
    cancel: (licenseUuid) => request(`${baseUrl}/${licenseUuid}`, { method: 'DELETE' }) as unknown as Promise<void>,
    cancelMany: (licenseUuids) => request(`${baseUrl}/cancel`, { method: 'POST', body: JSON.stringify(licenseUuids) }) as unknown as Promise<void>,
    check: ({ productUuid, granteeIds, grace }) => request(getUrl(`${baseUrl}/check`, { productUuid, granteeIds, grace }), { method: 'GET' }) as unknown as Promise<CheckLicensesCapabilitiesResponse>,
    verify: ({ publicKey, signature, payload }) => {
        const verify = crypto.createVerify('sha256');
        verify.write(payload);
        verify.end();
        return verify.verify(publicKey, signature, 'hex');
    }
});