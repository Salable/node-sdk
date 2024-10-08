import { ApiRequest } from "@/src";
import { SALABLE_BASE_URL } from "@/src/constants";
import { Role } from "@/src/types";
import { RbacRolesVersions } from "..";

export const v2RbacRolesMethods = (request: ApiRequest): RbacRolesVersions['v2'] => ({
    getAll: async (): Promise<Role[]> => {
        return request(`${SALABLE_BASE_URL}/rbac/roles`, { method: 'GET' }) as unknown as Role[];
    },
    getOne: async (roleUuid): Promise<Role> => {
        return request(`${SALABLE_BASE_URL}/rbac/roles/${roleUuid}`, { method: 'GET' }) as unknown as Role;
    },
    create: async (roleData): Promise<Role> => {
        return request(`${SALABLE_BASE_URL}/rbac/roles`, { method: 'POST', body: JSON.stringify(roleData) }) as unknown as Role;
    },
    update: async (roleUuid, roleData): Promise<Role> => {
        return request(`${SALABLE_BASE_URL}/rbac/roles/${roleUuid}`, { method: 'PUT', body: JSON.stringify(roleData) }) as unknown as Role;
    },
    delete: async (roleUuid): Promise<void> => {
        return request(`${SALABLE_BASE_URL}/rbac/roles/${roleUuid}`, { method: 'DELETE' }) as unknown as void;
    },
});