import { ApiRequest, TVersion, Version } from "..";
import { Permission, UpdatePermissionInput, CreatePermissionInput } from "@/src/types";
import { v2RbacPermissionsMethods } from "./v2";

export type RbacPermissionsVersions = {
  [Version.V2]: {
    /**
    *  Get all RBAC permissions
    * 
    * @returns {Promise<Permission[]>} All RBAC permissions belonging to the organisation
    */
    getAll: () => Promise<Permission[]>,
    /**
     *  Get one RBAC permission
     * 
     *  @param {string} permissionUuid - The UUID of the permission
     *  @returns {Promise<Permission>}
     */
    getOne: (permissionUuid: string) => Promise<Permission>,
    /**
    *  Creates an RBAC permission
    *
    * @param {string} permissionUuid - The UUID of the permission
    * @param {UpdatePermissionInput} data
    * @param {UpdatePermissionInput} data.value - The new value of the permission
    * @param {UpdatePermissionInput} data.type - (Optional) The new type of the permission
    * @param {UpdatePermissionInput} data.description - (Optional) The new description of the permission
    * @param {UpdatePermissionInput} data.dependencies - (Optional) The new dependencies of the permission
    *
    * @returns {Promise<Permission>} The created permission
     */
    create: (permissionData: CreatePermissionInput) => Promise<Permission>,
    /**
      *  Update an RBAC Permission
      *
      * @param {string} permissionUuid - The UUID of the permission
      * @param {UpdatePermissionInput} data
      * @param {UpdatePermissionInput} data.value - (Optional) The new value of the permission
      * @param {UpdatePermissionInput} data.type - (Optional) The new type of the permission
      * @param {UpdatePermissionInput} data.description - (Optional) The new description of the permission
      * @param {UpdatePermissionInput} data.dependencies - (Optional) The new dependencies of the permission
      *
      * @returns {Promise<Permission>} The updated permission
      */
    update: (permissionUuid: string, data: UpdatePermissionInput) => Promise<Permission>,
    /**
     *  Delete an RBAC permission
     *
     *  @param {string} permissionUuid - The UUID of the permission
     *
     * @returns {Promise<void>}
     */
    delete: (permissionUuid: string) => Promise<void>,
  };
};

export type RbacPermissionsVersionedMethods<V extends TVersion> = V extends keyof RbacPermissionsVersions ? RbacPermissionsVersions[V] : never;

export const rbacPermissionsInit = <V extends TVersion>(
  version: V,
  request: ApiRequest
): RbacPermissionsVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2RbacPermissionsMethods(request) as RbacPermissionsVersionedMethods<V>;
    default:
      throw new Error("Unsupported version");
  }
};