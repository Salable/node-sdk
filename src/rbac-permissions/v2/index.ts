import { ApiRequest } from "@/src";
import { SALABLE_BASE_URL } from "@/src/constants";
import { Permission } from "@/src/types";
import { RbacPermissionsVersions } from "..";

export const v2RbacPermissionsMethods = (request: ApiRequest): RbacPermissionsVersions['v2'] => ({
    getAll: async (): Promise<Permission[]> => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions`, { method: 'GET' }) as unknown as Permission[];
    },
    getOne: async (permissionUuid): Promise<Permission> => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions/${permissionUuid}`, { method: 'GET' }) as unknown as Permission;
    },
    create: async (permissionData): Promise<Permission> => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions`, { method: 'POST', body: JSON.stringify(permissionData) }) as unknown as Permission;
    },
    update: async (permissionUuid, permissionData): Promise<Permission> => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions/${permissionUuid}`, { method: 'PUT', body: JSON.stringify(permissionData) }) as unknown as Permission;
    },
    delete: async (permissionUuid): Promise<void> => {
        return request(`${SALABLE_BASE_URL}/rbac/permissions/${permissionUuid}`, { method: 'DELETE' }) as unknown as void;
    },
});