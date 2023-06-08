import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import { ICreatePermissionInput, IPermission, IUpdatePermissionInput } from '../types';

/**
 * Salable Node SDK RBAC Permissions Class
 *
 * Contains the Salable RBAC Permissions methods
 */
export default class Permissions extends Base {
  /**
   *  Get all permissions
   *
   * @returns {Promise<IPermission[]>} All permissions
   */
  public getAll(): Promise<IPermission[] | undefined> {
    return this._request<IPermission[]>(RESOURCE_NAMES.RBAC.PERMISSIONS);
  }

  /**
   *  Get a single permission
   *
   * @param {string} uuid - The UUID of the permission to get
   *
   * @returns {Promise<IPermission>} The details for the permission UUID passed
   */
  public getOne(uuid: string): Promise<IPermission | undefined> {
    return this._request<IPermission>(`${RESOURCE_NAMES.RBAC.PERMISSIONS}/${uuid}`);
  }

  /**
   *  Create a new permission
   *
   * @param {ICreatePermissionInput} permissionDetails - The details of the new permission to be created
   *
   * @returns {Promise<IPermission>} The created permission
   */
  public create(permissionDetails: ICreatePermissionInput): Promise<IPermission | undefined> {
    return this._request<IPermission, ICreatePermissionInput>(RESOURCE_NAMES.RBAC.PERMISSIONS, {
      method: 'POST',
      body: permissionDetails,
    });
  }

  /**
   *  Deletes a permission
   *
   * @param {string} uuid - The UUID of the permission to delete
   *
   * @returns {Promise<void>} The deleted permission
   */
  public delete(uuid: string): Promise<void> {
    return this._request<void>(`${RESOURCE_NAMES.RBAC.PERMISSIONS}/${uuid}`, {
      method: 'DELETE',
    });
  }

  /**
   *  Updates a permission
   *
   * @param {string} uuid - The UUID of the permission to update
   * @param {IUpdatePermissionInput} permissionDetails - The details to update the permission with
   *
   * @returns {Promise<IPermission>} The updated permission
   */
  public update(
    uuid: string,
    permissionDetails: IUpdatePermissionInput
  ): Promise<IPermission | undefined> {
    return this._request<IPermission, IUpdatePermissionInput>(
      `${RESOURCE_NAMES.RBAC.PERMISSIONS}/${uuid}`,
      {
        method: 'PUT',
        body: permissionDetails,
      }
    );
  }
}
