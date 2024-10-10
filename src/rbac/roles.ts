import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import { ICreateRoleInput, IRole, IUpdateRoleInput } from '../types';

/**
 * Salable Node SDK RBAC Roles Class
 *
 * Contains the Salable RBAC Roles methods
 *
 * @deprecated
 */
export default class Roles extends Base {
  /**
   *  Get all roles
   * @deprecated
   * @returns {Promise<IRole[]>} All roles
   */
  public getAll(): Promise<IRole[]> {
    return this._request<IRole[]>(RESOURCE_NAMES.RBAC.ROLES);
  }

  /**
   *  Get a single role
   *
   * @param {string} uuid - The UUID of the role to get
   * @deprecated
   * @returns {Promise<IRole>} The details for the role UUID passed
   */
  public getOne(uuid: string): Promise<IRole> {
    return this._request<IRole>(`${RESOURCE_NAMES.RBAC.ROLES}/${uuid}`);
  }

  /**
   *  Create a new role
   *
   * @param {ICreateRoleInput} roleDetails - The details of the new role to be created
   * @deprecated
   * @returns {Promise<IRole>} The created role
   */
  public create(roleDetails: ICreateRoleInput): Promise<IRole> {
    return this._request<IRole, ICreateRoleInput>(RESOURCE_NAMES.RBAC.ROLES, {
      method: 'POST',
      body: roleDetails,
    });
  }

  /**
   *  Deletes a role
   *
   * @param {string} uuid - The UUID of the role to delete
   * @deprecated
   * @returns {Promise<void>} The created role
   */
  public delete(uuid: string): Promise<void> {
    return this._request<void>(`${RESOURCE_NAMES.RBAC.ROLES}/${uuid}`, {
      method: 'DELETE',
    });
  }

  /**
   *  Updates a role
   *
   * @param {string} uuid - The UUID of the role to update
   * @param {IUpdateRoleInput} roleDetails - The details to update the role with
   * @deprecated
   * @returns {Promise<IRole>} The updated role
   */
  public update(uuid: string, roleDetails: IUpdateRoleInput): Promise<IRole> {
    return this._request<IRole, IUpdateRoleInput>(`${RESOURCE_NAMES.RBAC.ROLES}/${uuid}`, {
      method: 'PUT',
      body: roleDetails,
    });
  }
}
