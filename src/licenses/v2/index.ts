import { ApiRequest } from "@/src";
import { SALABLE_BASE_URL } from "@/src/constants";
import { CheckLicenseInput, CheckLicensesCapabilities, CreateAdhocLicenseInput, GetLicenseCountInput, GetPurchasersLicensesInput, License, GetLicenseCountResponse, UpdateManyLicenseInput, GetLicenseOptions, GetAllLicensesResponse } from "@/src/types";
import crypto from 'crypto';
import { LicenseVersions } from "..";

export const v2LicenseMethods = (request: ApiRequest): LicenseVersions['v2'] => ({
    getAll: async (options?: GetLicenseOptions): Promise<GetAllLicensesResponse> => {
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
    getOne: async (licenseUuid: string, options?: { expand: string[] }): Promise<License> => {
        let url = `${SALABLE_BASE_URL}/licenses${licenseUuid}`;
        if (options?.expand) {
            url += `?expand=${options.expand.join(',')}`;
        }
        return request(url, { method: 'GET' }) as unknown as License;
    },
    getCount: async ({ subscriptionUuid, status }: GetLicenseCountInput): Promise<GetLicenseCountResponse> => {
        let url = `${SALABLE_BASE_URL}/licenses/count`;
        if (subscriptionUuid) url += `?subscriptionUuid=${subscriptionUuid}`;
        if (status) url += `${subscriptionUuid ? '&' : '?'}status=${status}`;
        return request(`${SALABLE_BASE_URL}/licenses/count`, { method: 'GET' }) as unknown as GetLicenseCountResponse;
    },
    getForPurchaser: async (purchaserData: GetPurchasersLicensesInput): Promise<License[]> => {
        let url = `${SALABLE_BASE_URL}/licenses/purchaser?purchaser=${purchaserData.purchaser}&productUuid=${purchaserData.productUuid}`;
        if (purchaserData.options && purchaserData.options.status) url += `&status=${purchaserData.options.status}`;
        return request(url, { method: 'GET' }) as unknown as License[];
    },
    getForGranteeId: async ({ granteeId }, options?: { expand?: string[] }) => {
        let url = `${SALABLE_BASE_URL}/licenses/granteeId${granteeId}`;
        if (options && options.expand) {
            url += `?expand=${options.expand.join(',')}`;
        }
        return request(url, { method: 'GET' }) as unknown as License[];
    },
    create: async (licenseData: CreateAdhocLicenseInput[]) => {
        return request(`${SALABLE_BASE_URL}/licenses`, { method: 'POST', body: JSON.stringify(licenseData) }) as unknown as License[];
    },
    update: async (licenseUuid: string, data: { granteeId: string }): Promise<License> => {
        return request(`${SALABLE_BASE_URL}/licenses/${licenseUuid}`, { method: 'PUT', body: JSON.stringify(data) }) as unknown as License;
    },
    updateMany: async (licenses: UpdateManyLicenseInput[]): Promise<License[]> => {
        return request(`${SALABLE_BASE_URL}/licenses`, { method: 'PUT', body: JSON.stringify(licenses) }) as unknown as License[];
    },
    cancel: async (licenseUuid: string): Promise<void> => {
        return request(`${SALABLE_BASE_URL}/licenses/${licenseUuid}`, { method: 'DELETE' }) as unknown as void;
    },
    cancelMany: async (licenseUuids: string[]): Promise<void> => {
        return request(`${SALABLE_BASE_URL}/licenses/cancel`, { method: 'POST', body: JSON.stringify(licenseUuids) }) as unknown as void;
    },
    check: async ({ productUuid, granteeIds, grace }: CheckLicenseInput): Promise<CheckLicensesCapabilities> => {
        let params = `productUuid=${productUuid}&granteeIds=${granteeIds.toString()}`;
        if (grace) params += `&grace=${grace}`;
        return request(`${SALABLE_BASE_URL}/licenses/check${params}`, { method: 'GET' }) as unknown as CheckLicensesCapabilities;
    },
    verify: ({ publicKey, signature, payload }: { publicKey: string, signature: string, payload: string }): boolean => {
        const verify = crypto.createVerify('sha256');
        verify.write(payload);
        verify.end();
        return verify.verify(publicKey, signature, 'hex');
    }
});