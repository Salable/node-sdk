import { ApiRequest } from "@/src";
import { SALABLE_BASE_URL } from "@/src/constants";
import { Permission } from "@/src/types";
import { RbacPermissionsVersions } from "..";

export const v2RbacPermissionsMethods = (request: ApiRequest): RbacPermissionsVersions['v2'] => ({
    getAll: async ()=> {
        return request(`${SALABLE_BASE_URL}/rbac/permissions`, { method: 'GET' }) as unknown as Permission[];
    },
    getOne: async (permissionUuid) => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions/${permissionUuid}`, { method: 'GET' }) as unknown as Permission;
    },
    create: async (permissionData)=> {
        return request(`${SALABLE_BASE_URL}/rbac/permissions`, { method: 'POST', body: JSON.stringify(permissionData) }) as unknown as Permission;
    },
    update: async (permissionUuid, permissionData) => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions/${permissionUuid}`, { method: 'PUT', body: JSON.stringify(permissionData) }) as unknown as Permission;
    },
    delete: async (permissionUuid) => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions/${permissionUuid}`, { method: 'DELETE' }) as unknown as void;
    },
});