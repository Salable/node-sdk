import { ApiRequest } from "@/src";
import { SALABLE_BASE_URL } from "@/src/constants";
import { CheckLicensesCapabilitiesResponse, License, GetLicenseCountResponse, GetAllLicensesResponse } from "@/src/types";
import crypto from 'crypto';
import { LicenseVersions } from "..";

export const v2LicenseMethods = (request: ApiRequest): LicenseVersions['v2'] => ({
    getAll: async (options) => {
        let url = `${SALABLE_BASE_URL}/licenses`;
        let params = `?`;
        if (options) {
            let paramKeys = Object.entries(options);
            for (const [i, [key, value]] of Object.entries(paramKeys)) {
                if (Number(i) > 0 && Number(i) < paramKeys.length) params += '&';
                params += `${key}=${value}`;
            }
            if (params !== '?') url += params;
        }
        return request(url, { method: 'GET' }) as unknown as GetAllLicensesResponse;
    },
    getOne: async (licenseUuid, options)=> {
        let url = `${SALABLE_BASE_URL}/licenses${licenseUuid}`;
        if (options?.expand) {
            url += `?expand=${options.expand.join(',')}`;
        }
        return request(url, { method: 'GET' }) as unknown as License;
    },
    getCount: async ({ subscriptionUuid, status })=> {
        let url = `${SALABLE_BASE_URL}/licenses/count`;
        if (subscriptionUuid) url += `?subscriptionUuid=${subscriptionUuid}`;
        if (status) url += `${subscriptionUuid ? '&' : '?'}status=${status}`;
        return request(`${SALABLE_BASE_URL}/licenses/count`, { method: 'GET' }) as unknown as GetLicenseCountResponse;
    },
    getForPurchaser: async (purchaserData)=> {
        let url = `${SALABLE_BASE_URL}/licenses/purchaser?purchaser=${purchaserData.purchaser}&productUuid=${purchaserData.productUuid}`;
        if (purchaserData.options && purchaserData.options.status) url += `&status=${purchaserData.options.status}`;
        return request(url, { method: 'GET' }) as unknown as License[];
    },
    getForGranteeId: async ({ granteeId }, options) => {
        let url = `${SALABLE_BASE_URL}/licenses/granteeId${granteeId}`;
        if (options && options.expand) {
            url += `?expand=${options.expand.join(',')}`;
        }
        return request(url, { method: 'GET' }) as unknown as License[];
    },
    create: async (licenseData) => {
        return request(`${SALABLE_BASE_URL}/licenses`, { method: 'POST', body: JSON.stringify(licenseData) }) as unknown as License[];
    },
    update: async (licenseUuid, data) => {
        return request(`${SALABLE_BASE_URL}/licenses/${licenseUuid}`, { method: 'PUT', body: JSON.stringify(data) }) as unknown as License;
    },
    updateMany: async (licenses) => {
        return request(`${SALABLE_BASE_URL}/licenses`, { method: 'PUT', body: JSON.stringify(licenses) }) as unknown as License[];
    },
    cancel: async (licenseUuid) => {
        return request(`${SALABLE_BASE_URL}/licenses/${licenseUuid}`, { method: 'DELETE' }) as unknown as void;
    },
    cancelMany: async (licenseUuids)=> {
        return request(`${SALABLE_BASE_URL}/licenses/cancel`, { method: 'POST', body: JSON.stringify(licenseUuids) }) as unknown as void;
    },
    check: async ({ productUuid, granteeIds, grace })=> {
        let params = `productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`;
        if (grace) params += `&grace=${grace}`;
        return request(`${SALABLE_BASE_URL}/licenses/check${params}`, { method: 'GET' }) as unknown as CheckLicensesCapabilitiesResponse;
    },
    verify: ({ publicKey, signature, payload }) => {
        const verify = crypto.createVerify('sha256');
        verify.write(payload);
        verify.end();
        return verify.verify(publicKey, signature, 'hex');
    }
});