import { ApiRequest, TVersion, Version } from "..";
import { Role, CreateRoleInput, UpdateRoleInput } from "@/src/types";
import { v2RbacRolesMethods } from "./v2";

export type RbacRolesVersions = {
  [Version.V2]: {
    /**
    *  Get all RBAC roles
    * 
    * @returns {Promise<Role[]>} All RBAC roles belonging to the organisation
    */
    getAll: () => Promise<Role[]>,
    /**
    *  Get one RBAC role
    * 
    *  @param {string} roleUuid - The UUID of the role
    *  @returns {Promise<Role>}
    */
    getOne: (roleUuid: string) => Promise<Role>,
    /**
    *  Creates an RBAC role
    *
    * @param {CreateRoleInput} data
    * @param {CreateRoleInput} data.name - The name of the role
    * @param {CreateRoleInput} data.description - (Optional) The description of the role
    * @param {CreateRoleInput} data.permissions - (Optional) A list of permissions belonging to the role
    *
    * @returns {Promise<Role>} The created role
    */
    create: (roleData: CreateRoleInput) => Promise<Role>,
    /**
    *  Update an RBAC role
    *
    * @param {string} roleUuid - The UUID of the role
    * @param {UpdateRoleInput} data
    * @param {UpdateRoleInput} data.name - (Optional) The new name of the role
    * @param {UpdateRoleInput} data.description - (Optional) The new  description of the role
    * @param {UpdateRoleInput} data.permissions - (Optional) A new list of permissions for the role
    *
    * @returns {Promise<Role>} The updated role
    */
    update: (roleUuid: string, data: UpdateRoleInput) => Promise<Role>,
    /**
    *  Delete an RBAC role
    *
    * @param {string} roleUuid - The UUID of the role
    *
    * @returns {Promise<void>}
    */
    delete: (roleUuid: string) => Promise<void>,
  };
};

export type RbacRolesVersionedMethods<V extends TVersion> = V extends keyof RbacRolesVersions ? RbacRolesVersions[V] : never;

export const rbacRolesInit = <V extends TVersion>(
  version: V,
  request: ApiRequest
): RbacRolesVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2RbacRolesMethods(request) as RbacRolesVersionedMethods<V>;
    default:
      throw new Error("Unsupported version");
  }
};